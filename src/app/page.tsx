import { prisma } from "@/lib/prisma";

import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({});
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <Link href={`/posts/${post.id}`} className="text-blue-500">
              Read more
            </Link>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
