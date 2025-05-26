import Link from "next/link";

const posts = [
    { id: '1', title: 'next.js app router에 대해' },
    { id: '2', title: '난 실습 뭐하냐' },
];


export default function BlogList() {
    return (
        <main>
            <h1>블로그</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link
                            href={`/blog/${post.id}`}
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}