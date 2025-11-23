'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import GistEmbed from './GistEmbed';
import { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Process content to extract gist embeds
  const processContent = (text: string): { processedContent: string; gists: { id: string; url: string; file?: string }[] } => {
    const gists: { id: string; url: string; file?: string }[] = [];
    let gistCounter = 0;

    // Match gist URLs or embed syntax: {% gist url %} or just raw URLs
    const gistRegex = /(?:{%\s*gist\s+(https:\/\/gist\.github\.com\/[\w-]+\/[a-f0-9]+)(?:\s+file="([^"]+)")?\s*%})|(?:^(https:\/\/gist\.github\.com\/[\w-]+\/[a-f0-9]+)$)/gm;

    const processedContent = text.replace(gistRegex, (match, embedUrl, embedFile, standaloneUrl) => {
      const url = embedUrl || standaloneUrl;
      const file = embedFile;
      const id = `gist-${gistCounter++}`;
      gists.push({ id, url, file });
      return `<div data-gist-id="${id}"></div>`;
    });

    return { processedContent, gists };
  };

  const { processedContent, gists } = processContent(content);

  const components: Components = {
    // Custom image component with Next.js Image optimization
    img: ({ src, alt }) => {
      if (!src || typeof src !== 'string') return null;

      // Handle external images
      if (src.startsWith('http')) {
        return (
          <span className="block my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            {alt && <span className="block text-center text-sm text-muted mt-2">{alt}</span>}
          </span>
        );
      }

      // Handle local images with Next.js Image
      return (
        <span className="block my-6">
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={400}
            className="max-w-full h-auto rounded-lg shadow-md"
            style={{ width: '100%', height: 'auto' }}
          />
          {alt && <span className="block text-center text-sm text-muted mt-2">{alt}</span>}
        </span>
      );
    },

    // Custom code block with copy button functionality
    pre: ({ children, ...props }) => {
      return (
        <pre {...props} className="relative group">
          {children}
        </pre>
      );
    },

    // Handle gist placeholders
    div: ({ node, ...props }) => {
      const gistId = (node as unknown as { properties?: { 'data-gist-id'?: string } })?.properties?.['data-gist-id'];
      if (gistId) {
        const gist = gists.find(g => g.id === gistId);
        if (gist) {
          return <GistEmbed gistUrl={gist.url} file={gist.file} />;
        }
      }
      return <div {...props} />;
    },

    // Links open in new tab for external URLs
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
