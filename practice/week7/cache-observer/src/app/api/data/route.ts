import { NextRequest, NextResponse } from 'next/server';

// 간단한 메모리 저장소
let mockData = {
  id: 1,
  title: "샘플 데이터",
  value: 100,
  updatedAt: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  // 의도적인 지연 (캐시 효과를 체감하기 위해)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const fetchTime = new Date().toISOString();
  
  console.log(`🔄 API 호출: ${fetchTime}`);
  
  const response = NextResponse.json({
    ...mockData,
    fetchTime, // 언제 데이터를 가져왔는지 확인용
  });

  // 캐시 헤더 설정 (5초 캐시)
  response.headers.set('Cache-Control', 'public, max-age=5, s-maxage=5');
  
  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  mockData = {
    ...mockData,
    ...body,
    updatedAt: new Date().toISOString(),
  };
  
  console.log(`✏️ 데이터 업데이트:`, mockData);
  
  return NextResponse.json(mockData);
} 