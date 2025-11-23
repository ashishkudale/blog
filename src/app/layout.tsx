import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

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
        <Providers>
          <Header />
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-border mt-16">
            <div className="max-w-4xl mx-auto px-4 py-8 text-center text-muted text-sm">
              <p>&copy; {new Date().getFullYear()} DevBlog. Built with Next.js and Tailwind CSS.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
