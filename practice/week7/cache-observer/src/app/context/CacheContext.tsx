'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface CacheState {
  requestMemo: number;
  dataCache: {
    status: 'HIT' | 'MISS' | 'LOADING';
    timestamp: number;
    ttl?: number;
  };
  fullRouteCache: {
    '/': number;
    '/detail': number;
    '/admin': number;
  };
  routerCache: {
    '/': number;
    '/detail': number;
    '/admin': number;
  };
  currentActivity: string;
}

interface CacheContextType {
  cacheState: CacheState;
  updateCacheState: (type: string, data?: any) => void;
  resetCache: () => void;
}

const initialState: CacheState = {
  requestMemo: 0,
  dataCache: {
    status: 'MISS',
    timestamp: 0,
  },
  fullRouteCache: {
    '/': 0,
    '/detail': 0,
    '/admin': 0,
  },
  routerCache: {
    '/': 0,
    '/detail': 0,
    '/admin': 0,
  },
  currentActivity: '대기 중',
};

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export function CacheProvider({ children }: { children: ReactNode }) {
  const [cacheState, setCacheState] = useState<CacheState>(initialState);

  const updateCacheState = useCallback((type: string, data?: any) => {
    const now = Date.now();
    
    setCacheState(prev => {
      switch (type) {
        case 'API_START':
          return {
            ...prev,
            requestMemo: 0,
            dataCache: { ...prev.dataCache, status: 'LOADING' },
            currentActivity: 'API 호출 중...',
          };
        
        case 'API_HIT':
          return {
            ...prev,
            dataCache: { status: 'HIT', timestamp: now },
            currentActivity: '캐시에서 데이터 로드',
          };
        
        case 'API_MISS':
          return {
            ...prev,
            dataCache: { status: 'MISS', timestamp: now },
            currentActivity: '새 데이터 가져옴',
          };
        
        case 'ROUTE_VISIT':
          return {
            ...prev,
            routerCache: { ...prev.routerCache, [data.path]: now },
            fullRouteCache: { ...prev.fullRouteCache, [data.path]: now },
            currentActivity: `${data.path} 페이지 방문`,
          };
        
        case 'REQUEST_MEMO':
          return {
            ...prev,
            requestMemo: prev.requestMemo + 1,
            currentActivity: `요청 메모이제이션 발생 (${prev.requestMemo + 1}개 컴포넌트)`,
          };
        
        case 'CACHE_INVALIDATE':
          return {
            ...prev,
            dataCache: { status: 'MISS', timestamp: 0 },
            currentActivity: '캐시 무효화 실행',
          };
        
        case 'RESET_MEMO':
          return {
            ...prev,
            requestMemo: 0,
            currentActivity: '요청 메모이제이션 카운터 초기화',
          };
        
        default:
          return prev;
      }
    });
  }, []);

  const resetCache = useCallback(() => {
    setCacheState(initialState);
  }, []);

  // 시간 업데이트를 위한 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCacheState(prev => ({ ...prev })); // 리렌더링 트리거
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <CacheContext.Provider value={{ cacheState, updateCacheState, resetCache }}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCacheContext() {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error('useCacheContext must be used within a CacheProvider');
  }
  return context;
} 