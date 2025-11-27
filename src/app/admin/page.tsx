'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('Ashish Kudale');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Small delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          author,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          coverImage: coverImage || undefined,
          content,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse response as JSON:', jsonError);
        setMessage({
          type: 'error',
          text: `Server error: Failed to parse response (${response.status} ${response.statusText})`
        });
        setIsSaving(false);
        return;
      }

      if (response.ok) {
        setMessage({ type: 'success', text: 'Blog post saved successfully!' });
        // Reset form
        setTitle('');
        setSlug('');
        setExcerpt('');
        setTags('');
        setCoverImage('');
        setContent('');
      } else {
        console.error('Failed to create post:', { status: response.status, error: data.error });
        setMessage({
          type: 'error',
          text: data.error || `Failed to save blog post (${response.status})`
        });
      }
    } catch (error) {
      console.error('Network or request error:', error);
      setMessage({
        type: 'error',
        text: `Network error: ${error instanceof Error ? error.message : 'An error occurred while saving'}`
      });
    }

    setIsSaving(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <button
          onClick={handleLogout}
          className="text-muted hover:text-foreground transition-colors"
        >
          Logout
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg font-medium ${
            message.type === 'success'
              ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-2 border-green-500/30'
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border-2 border-red-500/30'
          }`}
          role="alert"
        >
          <div className="flex items-start gap-2">
            <span className="text-xl" aria-hidden="true">
              {message.type === 'success' ? '✓' : '⚠'}
            </span>
            <div className="flex-1">
              {message.text}
              {message.type === 'success' && slug && (
                <Link
                  href={`/posts/${slug}`}
                  className="ml-2 underline hover:no-underline font-semibold"
                >
                  View post →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors"
              placeholder="post-url-slug"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors resize-none"
            placeholder="Brief description of the post"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors"
              placeholder="Author name"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors"
              placeholder="React, JavaScript, Tutorial"
            />
          </div>
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content (Markdown) *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-border focus:border-accent focus:outline-none transition-colors font-mono text-sm resize-y"
            placeholder="Write your blog post in Markdown..."
            required
          />
          <p className="text-xs text-muted mt-2">
            Supports Markdown syntax, code blocks with syntax highlighting, and GitHub Gists.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-accent text-white py-2 px-6 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
          <Link
            href="/"
            className="py-2 px-6 rounded-lg border border-border hover:border-accent transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
