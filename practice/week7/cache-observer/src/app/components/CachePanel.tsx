'use client';

import { useCacheContext } from '../context/CacheContext';

export default function CachePanel() {
  const { cacheState } = useCacheContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HIT':
      case 'FRESH':
        return 'text-green-400';
      case 'LOADING':
        return 'text-yellow-400';
      case 'MISS':
      case 'STALE':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HIT':
      case 'FRESH':
        return '✅';
      case 'LOADING':
        return '⏳';
      case 'MISS':
      case 'STALE':
        return '❌';
      default:
        return '⚪';
    }
  };

  const getTimeAgo = (timestamp: number) => {
    if (!timestamp) return '';
    
    try {
      const now = Date.now();
      const diffMs = now - timestamp;
      const diffSeconds = Math.floor(diffMs / 1000);
      
      if (diffSeconds < 0) return '방금 전';
      if (diffSeconds < 60) return `${diffSeconds}초 전`;
      if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`;
      return `${Math.floor(diffSeconds / 3600)}시간 전`;
    } catch (error) {
      return '방금 전';
    }
  };

  return (
    <div className="fixed right-4 top-4 w-80 bg-gray-900 text-white p-4 rounded-lg shadow-lg font-mono text-sm">
      <h2 className="text-lg font-bold mb-4 text-center">캐시 상태</h2>
      
      {/* 요청 메모이제이션 */}
      <div className="mb-4">
        <h3 className="text-yellow-300 font-semibold mb-2">🔄 요청 메모이제이션</h3>
        <div className="pl-3 text-gray-300">
          <div>현재 요청: {cacheState.requestMemo}개</div>
          <div className="text-xs text-gray-400 mt-1">
            동일 렌더링 주기 내 중복 제거
          </div>
        </div>
        <div className="border-b border-gray-700 my-3"></div>
      </div>

      {/* 데이터 캐시 */}
      <div className="mb-4">
        <h3 className="text-blue-300 font-semibold mb-2">💾 데이터 캐시</h3>
        <div className="pl-3">
          <div className="text-gray-400">/api/data</div>
          <div className={`flex items-center gap-2 ${getStatusColor(cacheState.dataCache.status)}`}>
            <span>{getStatusIcon(cacheState.dataCache.status)}</span>
            <span>{cacheState.dataCache.status}</span>
            {cacheState.dataCache.timestamp && (
              <span className="text-gray-400 text-xs">
                {getTimeAgo(cacheState.dataCache.timestamp)}
              </span>
            )}
          </div>
        </div>
        <div className="border-b border-gray-700 my-3"></div>
      </div>

      {/* 전체 경로 캐시 */}
      <div className="mb-4">
        <h3 className="text-purple-300 font-semibold mb-2">📄 전체 경로 캐시</h3>
        <div className="pl-3 space-y-1">
          {Object.entries(cacheState.fullRouteCache).map(([path, timestamp]) => (
            <div key={path} className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">{path}</span>
              {timestamp ? (
                <span className="text-green-400">
                  ✅ {getTimeAgo(timestamp)}
                </span>
              ) : (
                <span className="text-gray-500">방문 안함</span>
              )}
            </div>
          ))}
        </div>
        <div className="border-b border-gray-700 my-3"></div>
      </div>

      {/* 라우터 캐시 */}
      <div className="mb-4">
        <h3 className="text-green-300 font-semibold mb-2">🧭 라우터 캐시</h3>
        <div className="pl-3 space-y-1">
          {Object.entries(cacheState.routerCache).map(([path, timestamp]) => (
            <div key={path} className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">{path}</span>
              {timestamp ? (
                <span className="text-green-400">
                  ✅ {getTimeAgo(timestamp)}
                </span>
              ) : (
                <span className="text-gray-500">방문 안함</span>
              )}
            </div>
          ))}
        </div>
        <div className="border-b border-gray-700 my-3"></div>
      </div>

      {/* 현재 활동 */}
      <div>
        <h3 className="text-orange-300 font-semibold mb-2">⚡ 진행 상황</h3>
        <div className="pl-3 text-gray-300">
          {cacheState.currentActivity}
        </div>
      </div>
    </div>
  );
} 