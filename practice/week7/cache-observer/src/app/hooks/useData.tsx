'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useCacheContext } from '../context/CacheContext';

interface DataType {
  title: string;
  value: number;
  updatedAt: string;
  fetchTime: string;
}

export function useData() {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateCacheState } = useCacheContext();
  const lastFetchTime = useRef<string>(''); // 이전 fetchTime 저장
  const hasCountedThisRender = useRef(false); // 현재 렌더링에서 카운팅 했는지

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    updateCacheState('API_START');

    // 각 컴포넌트마다 메모이제이션 카운터 증가 (렌더링마다 1번만)
    if (!hasCountedThisRender.current) {
      updateCacheState('REQUEST_MEMO');
      hasCountedThisRender.current = true;
    }

    try {
      const startTime = Date.now();
      const response = await fetch('/api/data', {
        cache: 'force-cache', // Next.js 15 캐싱 활용
      });
      const endTime = Date.now();
      const requestDuration = endTime - startTime;
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // 캐시 HIT/MISS 판단
      const isCacheHit = lastFetchTime.current === result.fetchTime;
      const isFastResponse = requestDuration < 100; // 100ms 미만이면 캐시로 간주
      
      // 캐시 상태 업데이트
      if (isCacheHit || isFastResponse) {
        updateCacheState('API_HIT');
        console.log('🎯 캐시 HIT - 기존 데이터 사용');
      } else {
        updateCacheState('API_MISS');
        lastFetchTime.current = result.fetchTime; // 새로운 fetchTime 저장
        console.log('🔄 캐시 MISS - 새 데이터 가져옴');
      }
      
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';
      setError(errorMessage);
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [updateCacheState]);

  const refetch = useCallback(() => {
    hasCountedThisRender.current = false; // 리셋하여 다시 카운팅 가능하게
    lastFetchTime.current = ''; // fetchTime 리셋으로 강제 MISS
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    hasCountedThisRender.current = false; // 새 렌더링 시작 시 리셋
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
} 