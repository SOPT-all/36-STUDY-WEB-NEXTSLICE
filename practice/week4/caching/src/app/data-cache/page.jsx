import { fetchWithLogging } from "../../lib/utils";
import Link from "next/link";

async function fetchWithDifferentCacheSettings() {
  // 캐싱 비활성화
  const noStore = await fetchWithLogging("/api/data?test=no-store", {
    cache: "no-store",
  });

  // 10초 후 재검증
  const revalidate10 = await fetchWithLogging("/api/data?test=revalidate-10", {
    next: { revalidate: 10 },
  });

  return { noStore, revalidate10 };
}

export default async function DataCacheTestPage() {
  const { noStore, revalidate10 } = await fetchWithDifferentCacheSettings();

  return (
    <div className="max-w-6xl mx-auto my-20">
      <h1 className="text-2xl font-bold mb-6">Data Cache 테스트</h1>

      <div className="grid grid-cols-2 gap-4 mb-20">
        <div>
          <h2 className="font-bold mb-2 text-xl text-blue-400">
            no-store: 매번 새로운 값이 표시
          </h2>
          <pre className="p-2 rounded text-sm overflow-auto">
            {JSON.stringify(noStore, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="font-bold mb-2 text-xl text-blue-400">
            revalidate: 10: 10초 이내에는 같은 값, 10초 후에는 새로운 값
          </h2>
          <pre className="p-2 rounded text-sm overflow-auto">
            {JSON.stringify(revalidate10, null, 2)}
          </pre>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <Link
          href="/data-cache"
          className="px-10 py-4 bg-blue-500 text-white text-xl rounded"
        >
          페이지 새로고침
        </Link>
        <Link
          href="/"
          className="px-10 py-4 bg-gray-500 text-white text-xl rounded"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
