'use client';

import { useState, useEffect } from 'react';
import { useCacheContext } from '../context/CacheContext';

interface DataType {
  id: number;
  title: string;
  value: number;
  updatedAt: string;
  fetchTime: string;
}

export function useData(cacheOption?: RequestInit) {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateCacheState } = useCacheContext();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    updateCacheState('API_START');

    try {
      const response = await fetch('/api/data', {
        // Next.js 15 기본값: 캐시 없음
        cache: 'no-store',
        ...cacheOption,
      });

      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다');
      }

      const result = await response.json();
      setData(result);
      
      // 캐시 상태 업데이트 (실제로는 더 복잡한 로직이 필요하지만 시연용)
      if (cacheOption?.cache === 'force-cache' || cacheOption?.next?.revalidate) {
        updateCacheState('API_HIT');
      } else {
        updateCacheState('API_MISS');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
      updateCacheState('API_MISS');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch };
}

// 캐시된 데이터를 가져오는 훅
export function useCachedData() {
  return useData({
    cache: 'force-cache', // 영구 캐시
  });
}

// 시간 기반 재검증을 사용하는 훅
export function useRevalidatedData(seconds: number = 10) {
  return useData({
    next: { revalidate: seconds }, // 지정된 시간 후 재검증
  });
}

// 태그 기반 캐시를 사용하는 훅
export function useTaggedData(tags: string[]) {
  return useData({
    next: { tags }, // 태그 기반 무효화
  });
} 