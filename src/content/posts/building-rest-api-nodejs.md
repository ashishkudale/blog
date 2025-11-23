---
title: "Building a REST API with Node.js and Express"
date: "2024-11-18"
excerpt: "A comprehensive guide to creating a RESTful API using Node.js and Express, complete with code examples and best practices."
author: "Ashish Kudale"
tags: ["Node.js", "Express", "API", "Backend"]
coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop"
---

Building APIs is a fundamental skill for modern web developers. In this tutorial, we'll create a REST API from scratch using Node.js and Express.

## Project Setup

First, initialize your project and install dependencies:

```bash
mkdir my-api && cd my-api
npm init -y
npm install express cors dotenv
npm install -D nodemon
```

## Basic Server Structure

Create your main server file:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Creating CRUD Routes

Here's a complete example of CRUD operations for a "posts" resource:

```javascript
// routes/posts.js
const express = require('express');
const router = express.Router();

// In-memory storage (use a database in production)
let posts = [
  { id: 1, title: 'First Post', content: 'Hello World!' },
  { id: 2, title: 'Second Post', content: 'Learning APIs' }
];

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET single post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// POST create new post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT update post
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;

  res.json(post);
});

// DELETE post
router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
```

## Error Handling Middleware

Add centralized error handling:

```javascript
// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
}

module.exports = errorHandler;
```

## Best Practices

1. **Use HTTP status codes correctly**
   - `200` - Success
   - `201` - Created
   - `400` - Bad Request
   - `404` - Not Found
   - `500` - Server Error

2. **Validate input data** - Never trust client input

3. **Use environment variables** for sensitive configuration

4. **Implement rate limiting** to prevent abuse

5. **Add authentication** for protected routes

## Testing Your API

Use curl or a tool like Postman to test your endpoints:

```bash
# Get all posts
curl http://localhost:3000/posts

# Create a new post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"New Post","content":"API testing"}'
```

## Conclusion

You now have a solid foundation for building REST APIs with Node.js. From here, you can add database integration, authentication, and more advanced features.
