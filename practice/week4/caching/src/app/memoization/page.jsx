import { fetchWithLogging } from "../../lib/utils";

async function fetchTwice() {
  // 첫 번째 요청
  const data1 = await fetchWithLogging("/api/data?test=memoization");

  // 첫 번째와 동일한 요청
  const data2 = await fetchWithLogging("/api/data?test=memoization");

  // 두 요청이 동일한 객체를 반환하는지 확인 (메모이제이션 확인)
  const isSameObject = JSON.stringify(data1) === JSON.stringify(data2);

  return { data1, data2, isSameObject };
}

export default async function MemoizationTestPage() {
  const { data1, data2, isSameObject } = await fetchTwice();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Request Memoization 테스트</h1>

      <div className="mb-6">
        <p className="mb-2 text-xl font-semibold">테스트 결과:</p>
        <p>
          첫 번째 요청 === 두 번째 요청
          <span className="text-yellow-500 text-3xl ml-4">
            {isSameObject ? "true" : "false"}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">첫 번째 요청 결과</h2>
          <pre className="p-2 rounded text-sm overflow-auto">
            {JSON.stringify(data1, null, 2)}
          </pre>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">두 번째 요청 결과</h2>
          <pre className="p-2 rounded text-sm overflow-auto">
            {JSON.stringify(data2, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
