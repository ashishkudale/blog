import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - DevBlog',
    };
  }

  return {
    title: `${post.title} - DevBlog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-muted hover:text-foreground mb-8 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-border rounded-full text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <MarkdownRenderer content={post.content} />

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/"
          className="inline-flex items-center text-accent hover:text-accent-hover transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all posts
        </Link>
      </footer>
    </article>
  );
}
