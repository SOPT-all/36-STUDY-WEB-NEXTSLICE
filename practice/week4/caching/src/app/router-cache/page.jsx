import { fetchWithLogging } from "../../lib/utils";
import Link from "next/link";

async function fetchDynamicData() {
  return fetchWithLogging("/api/data?source=router-cache-test");
}

export default async function RouterCacheTestPage() {
  const data = await fetchDynamicData();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Router Cache</h1>

      <div className="mb-6">
        <ol className="list-decimal pl-5 mb-4">
          <li>Router Cache: 페이지 이동 후 데이터가 변경되지 않음</li>
          <li>
            "강제 새로고침" 버튼을 클릭하면 Router Cache를 우회하고 새 데이터
            요청
          </li>
        </ol>
      </div>

      <div className="border p-4 rounded mb-6">
        <pre className="p-2 rounded text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div className="flex space-x-4">
        <Link
          href="/"
          className="px-8 py-4 text-lg bg-blue-500 text-white rounded"
        >
          다른 페이지로 이동
        </Link>

        <Link
          href="/router-cache"
          className="px-8 py-4 text-lg bg-red-500 text-white rounded"
          prefetch={false}
        >
          강제 새로고침
        </Link>
      </div>
    </div>
  );
}
