import Link from "next/link";

export default function Home() {
  return (
    <div className="p-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-12">캐싱 확인하기</h1>
      <div className="flex flex-col gap-8">
        <Link href="/memoization" className="block p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Request Memoization</h2>
          <p>동일한 렌더링 사이클 내에서의 중복 요청 캐싱을 확인해요</p>
        </Link>

        <Link href="/data-cache" className="block p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Data Cache</h2>
          <p>no-store, revalidate 옵션의 차이점을 확인해요</p>
        </Link>

        <Link
          href="/router-cache"
          className="block p-4 border rounded"
          prefetch={false}
        >
          <h2 className="text-xl font-bold mb-2">Router Cache</h2>
          <p>클라이언트 측 라우터 캐시가 어떻게 작동하는지 확인해요</p>
        </Link>
      </div>
    </div>
  );
}
