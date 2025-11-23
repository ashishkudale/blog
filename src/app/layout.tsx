import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevBlog - Share Your Technical Journey",
  description: "A modern blogging platform for developers to share code, ideas, and technical insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
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
            </div>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-border mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-muted text-sm">
            <p>&copy; {new Date().getFullYear()} DevBlog. Built with Next.js and Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
