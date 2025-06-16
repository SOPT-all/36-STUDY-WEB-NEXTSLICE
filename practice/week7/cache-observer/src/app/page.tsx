'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useData } from './hooks/useData';
import { useCacheContext } from './context/CacheContext';
import DataCard from './components/DataCard';

export default function Home() {
  const { data, loading, error, refetch } = useData();
  const { updateCacheState, resetCache } = useCacheContext();

  useEffect(() => {
    updateCacheState('ROUTE_VISIT', { path: '/' });
  }, [updateCacheState]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Next.js 15 캐시
          </h1>
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

        {/* 요청 메모이제이션 테스트 섹션 */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              🔄 요청 메모이제이션 테스트
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DataCard title="데이터 카드" cardNumber={1} />
              <DataCard title="데이터 카드" cardNumber={2} />
              <DataCard title="데이터 카드" cardNumber={3} />
            </div>
          </div>
        </div>

        {/* 메인 데이터 표시 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📊 메인 데이터
          </h2>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">데이터 로딩 중...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              오류: {error}
            </div>
          )}

          {data && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 font-medium">제목:</span>
                  <p className="text-lg">{data.title}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">값:</span>
                  <p className="text-lg font-bold text-blue-600">{data.value}</p>
                </div>
              </div>
              
              <div className="border-t pt-3 mt-4">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>📅 데이터 업데이트: {new Date(data.updatedAt).toLocaleString()}</p>
                  <p>🔄 데이터 조회: {new Date(data.fetchTime).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={refetch}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            🔄 데이터 새로고침
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            🌐 페이지 새로고침
          </button>
          <button 
            onClick={() => {
              resetCache();
              alert('🗑️ 캐시 상태가 초기화되었습니다. 수동으로 새로고침해주세요.');
            }}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            🗑️ 캐시 초기화
          </button>
        </div>

        {/* 설명 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 테스트 방법</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <div>
              <strong>🔄 요청 메모이제이션 테스트:</strong>
              <ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
                <li>페이지를 새로고침 (F5 또는 Cmd+R)</li>
                <li>우측 패널에서 "현재 요청: 4개" 확인</li>
                <li>개발자 도구 → Network 탭에서 /api/data 요청이 <strong>1번만</strong> 발생하는지 확인</li>
                <li>3개 카드의 조회 시간이 <strong>모두 동일</strong>한지 확인</li>
              </ol>
            </div>
            <div>
              <strong>💾 데이터 캐시 테스트:</strong>
              <ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
                <li>"데이터 새로고침" 버튼 클릭 → MISS (1초 지연)</li>
                <li>즉시 다시 클릭 → HIT (빠른 응답)</li>
                <li>5초 후 다시 클릭 → MISS (캐시 만료)</li>
              </ol>
            </div>
            <div>
              <strong>🧭 라우터 캐시 테스트:</strong>
              <span className="ml-2">상세 페이지 이동 후 뒤로가기로 확인</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
