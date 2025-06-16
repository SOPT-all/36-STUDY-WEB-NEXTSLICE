'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useData } from '../hooks/useData';
import { useCacheContext } from '../context/CacheContext';

export default function AdminPage() {
  const { data, loading, error, refetch } = useData();
  const { updateCacheState } = useCacheContext();
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    updateCacheState('ROUTE_VISIT', { path: '/admin' });
  }, [updateCacheState]);

  const handleDataUpdate = async () => {
    if (!newValue.trim()) {
      alert('새로운 값을 입력해주세요.');
      return;
    }

    try {
      console.log('데이터 업데이트 시작:', newValue);
      
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: parseInt(newValue) }),
      });

      console.log('응답 상태:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('업데이트 결과:', result);
        
        updateCacheState('CACHE_INVALIDATE');
        setNewValue('');
        
        // 성공 메시지
        alert('✅ 데이터가 성공적으로 업데이트되었습니다!');
        
        // 데이터 새로고침
        setTimeout(() => {
          refetch();
        }, 100);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('데이터 업데이트 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert('❌ 데이터 업데이트에 실패했습니다: ' + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            관리자 페이지
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

        {/* 현재 데이터 표시 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📊 현재 데이터
          </h2>
          
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">로딩 중...</p>
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

        {/* 데이터 수정 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ✏️ 데이터 수정
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새로운 값
              </label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="숫자를 입력하세요"
              />
            </div>
            
            <button
              onClick={handleDataUpdate}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              🔄 데이터 업데이트
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 