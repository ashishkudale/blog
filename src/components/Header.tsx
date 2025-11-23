'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b border-border">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-accent transition-colors">
          DevBlog
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-muted hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
          {isAuthenticated ? (
            <Link
              href="/admin"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Admin
            </Link>
          ) : (
            <Link
              href="/admin/login"
              className="text-muted hover:text-foreground transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
