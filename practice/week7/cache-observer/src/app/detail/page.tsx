'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useData } from '../hooks/useData';
import { useCacheContext } from '../context/CacheContext';

export default function DetailPage() {
  const { data, loading, error } = useData();
  const { updateCacheState } = useCacheContext();

  useEffect(() => {
    updateCacheState('ROUTE_VISIT', { path: '/detail' });
  }, [updateCacheState]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📋 상세 페이지
          </h1>
          <p className="text-gray-600">
            동일한 데이터를 다른 페이지에서 확인
          </p>
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-center gap-4 mb-8">
          <Link 
            href="/" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            메인
          </Link>
          <Link 
            href="/detail" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            상세
          </Link>
          <Link 
            href="/admin" 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            관리자
          </Link>
        </div>

        {/* 상세 데이터 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🔍 상세 정보
          </h2>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
              <p className="text-gray-600">데이터 로딩 중...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              오류: {error}
            </div>
          )}

          {data && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">기본 정보</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">ID:</span> {data.id}</p>
                  <p><span className="font-medium">제목:</span> {data.title}</p>
                  <p><span className="font-medium">값:</span> <span className="text-green-600 font-bold">{data.value}</span></p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">시간 정보</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">데이터 생성:</span> {new Date(data.updatedAt).toLocaleString()}</p>
                  <p><span className="font-medium">마지막 조회:</span> {new Date(data.fetchTime).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center">
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            ← 뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
} 