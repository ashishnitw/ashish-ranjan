#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../public/articles');

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const [, frontmatterStr, markdownContent] = match;
  const metadata = {};

  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      metadata[key] = value;
    }
  });

  return { metadata, content: markdownContent.trim() };
}

function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  
  const articles = files.map((file, index) => {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { metadata } = parseFrontmatter(content);
    
    return {
      id: index + 1,
      ...metadata,
      file
    };
  });

  return articles;
}

const articles = getAllArticles();
console.log('📚 Available Articles:\n');

articles.forEach(article => {
  console.log(`[${article.id}] ${article.title}`);
  console.log(`    Slug: ${article.slug}`);
  console.log(`    Date: ${article.date}`);
  console.log(`    Read Time: ${article.readTime}`);
  console.log(`    File: ${article.file}`);
  console.log('');
});

console.log(`Total: ${articles.length} articles`);
