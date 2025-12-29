'use client';

import { useData } from '../hooks/useData';

interface DataCardProps {
  title: string;
  cardNumber: number;
}

export default function DataCard({ title, cardNumber }: DataCardProps) {
  const { data, loading, error } = useData();

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-gray-700 mb-2 text-sm">
        {title} #{cardNumber}
      </h3>
      
      {loading && (
        <div className="flex items-center gap-2 text-blue-600">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
          <span className="text-xs">로딩 중...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-xs">
          오류: {error}
        </div>
      )}

      {data && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">제목:</span>
            <span className="text-sm font-medium">{data.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">값:</span>
            <span className="text-sm font-bold text-blue-600">{data.value}</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {new Date(data.fetchTime).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
} 