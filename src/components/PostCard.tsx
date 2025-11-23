import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { PostMeta } from '@/lib/posts';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted">
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
          <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          <p className="text-muted line-clamp-2">{post.excerpt}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-border rounded-full text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
