'use client';

import { useEffect, useRef, useState } from 'react';

interface GistEmbedProps {
  gistUrl: string;
  file?: string;
}

export default function GistEmbed({ gistUrl, file }: GistEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(200);

  // Extract gist ID from URL
  const getGistId = (url: string): string | null => {
    const match = url.match(/gist\.github\.com\/[\w-]+\/([a-f0-9]+)/i);
    return match ? match[1] : null;
  };

  const gistId = getGistId(gistUrl);

  useEffect(() => {
    if (!gistId || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const fileParam = file ? `?file=${encodeURIComponent(file)}` : '';

    const iframeContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_parent">
          <style>
            * { margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            .gist .gist-file { margin: 0 !important; border: none !important; }
            .gist .gist-data { border: none !important; }
            .gist .gist-meta { display: none !important; }
          </style>
        </head>
        <body>
          <script src="https://gist.github.com/${gistUrl.split('gist.github.com/')[1]}.js${fileParam}"></script>
          <script>
            window.addEventListener('load', function() {
              const height = document.body.scrollHeight;
              window.parent.postMessage({ type: 'gist-height', height: height }, '*');
            });
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = iframeContent;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'gist-height') {
        setHeight(event.data.height + 20);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [gistId, gistUrl, file]);

  if (!gistId) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
        Invalid Gist URL: {gistUrl}
      </div>
    );
  }

  return (
    <div className="gist-embed my-6">
      <iframe
        ref={iframeRef}
        title={`GitHub Gist ${gistId}`}
        style={{ width: '100%', height: `${height}px`, border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}
