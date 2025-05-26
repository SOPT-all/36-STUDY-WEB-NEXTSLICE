import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="p-10 text-center">
            <h1 className="text-3xl font-bold text-red-600">Not Found 페이지</h1>
            <Link href="/" className="mt-6 inline-block text-blue-500 underline">
                홈으로 돌아가기
            </Link>
        </main>
    );
}