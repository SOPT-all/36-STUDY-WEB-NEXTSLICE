'use client';

import { useState } from 'react';

export default function PostCard({
  title,
  initialLikes,
}: {
  title: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>좋아요 ❤️ {likes}개</p>
      <button
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => setLikes(likes + 1)}
      >
        좋아요 누르기
      </button>
    </div>
  );
}
