import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - DevBlog',
  description: 'Learn more about DevBlog and its author',
};

export default function AboutPage() {
  return (
    <div className="prose mx-auto">
      <h1>About DevBlog</h1>

      <p>
        Welcome to DevBlog, a personal space where I share my journey through the world of
        software development. Here you&apos;ll find articles about web development, programming
        concepts, code tutorials, and insights from real-world projects.
      </p>

      <h2>What You&apos;ll Find Here</h2>

      <ul>
        <li>
          <strong>Technical Tutorials</strong> - Step-by-step guides on various technologies
          and frameworks
        </li>
        <li>
          <strong>Code Snippets</strong> - Useful code examples with syntax highlighting
        </li>
        <li>
          <strong>GitHub Gists</strong> - Embedded code snippets from GitHub for easy sharing
        </li>
        <li>
          <strong>Project Insights</strong> - Lessons learned from building real applications
        </li>
      </ul>

      <h2>Tech Stack</h2>

      <p>This blog is built with modern web technologies:</p>

      <ul>
        <li><strong>Next.js</strong> - React framework for production</li>
        <li><strong>TypeScript</strong> - Type-safe JavaScript</li>
        <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
        <li><strong>Markdown</strong> - For writing blog posts</li>
      </ul>

      <h2>Connect</h2>

      <p>
        Feel free to reach out if you have questions, suggestions, or just want to connect!
      </p>
    </div>
  );
}
