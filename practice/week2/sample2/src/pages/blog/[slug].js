import { posts } from "../../data/posts";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/post.module.css";

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href={`/blog/${post.slug}/edit`}>Edit</Link>
      <Link href={`/`}>Home</Link>
    </div>
  );
}

// 동적 경로에 대한 게시글을 생성
export async function getStaticPaths() {
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

// 해당 슬러그에 맞는 데이터를 가져옴
export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  return {
    props: {
      post,
    },
  };
}
