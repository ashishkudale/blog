import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to DevBlog</h1>
        <p className="text-lg text-muted max-w-2xl">
          A place to share technical insights, code snippets, tutorials, and development experiences.
          Explore articles on web development, software engineering, and more.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted">
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
