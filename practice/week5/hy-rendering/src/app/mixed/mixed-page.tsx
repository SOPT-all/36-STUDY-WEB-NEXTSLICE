import { getPost } from '../../lib/post-data';
import PostCard from './post-card';

export default async function Page() {
  const post = await getPost();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🧠 서버 + 클라이언트 컴포넌트 조합</h1>
      <PostCard title={post.title} initialLikes={post.likes} />
    </div>
  );
}
