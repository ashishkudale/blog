import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.excerpt || !data.content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, excerpt, and content are required' },
        { status: 400 }
      );
    }

    // Sanitize slug
    const sanitizedSlug = data.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!sanitizedSlug) {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      );
    }

    // Ensure posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Check if post with same slug already exists
    const filePath = path.join(postsDirectory, `${sanitizedSlug}.md`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }

    // Create frontmatter
    const date = new Date().toISOString().split('T')[0];
    let frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${data.excerpt.replace(/"/g, '\\"')}"`;

    if (data.author) {
      frontmatter += `\nauthor: "${data.author.replace(/"/g, '\\"')}"`;
    }

    if (data.tags && data.tags.length > 0) {
      frontmatter += `\ntags: [${data.tags.map(tag => `"${tag.replace(/"/g, '\\"')}"`).join(', ')}]`;
    }

    if (data.coverImage) {
      frontmatter += `\ncoverImage: "${data.coverImage}"`;
    }

    frontmatter += '\n---\n\n';

    // Write the file
    const fileContent = frontmatter + data.content;
    fs.writeFileSync(filePath, fileContent, 'utf8');

    return NextResponse.json(
      { message: 'Post created successfully', slug: sanitizedSlug },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
