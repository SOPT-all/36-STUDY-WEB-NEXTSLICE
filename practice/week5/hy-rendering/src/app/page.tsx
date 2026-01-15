import ServerInfo from './server-only/server-info';
import Counter from './client-only/counter';
import MixedPage from './mixed/mixed-page';

export default function Page() {
  return (
    <main className="text-2xl font-bold p-[2rem]">
      <h1>🔍 Server vs Client Component 알아보기</h1>
      <hr />

      <section className="text-xl font-bold mt-[2rem]">
        <h2>🖥 1. 서버 컴포넌트</h2>
        <ServerInfo />
      </section>

      <section className="text-xl font-bold mt-[2rem]">
        <h2>🖱 2. 클라이언트 컴포넌트</h2>
        <Counter />
      </section>

      <section className="text-xl font-bold mt-[2rem]">
        <h2>💡 3. 서버+클라이언트 컴포넌트</h2>
        <MixedPage />
      </section>
    </main>
  );
}