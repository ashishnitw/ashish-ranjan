#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../src/data/articles');
const distDir = path.join(__dirname, '../dist');

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
  
  const articles = files.map((file) => {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { metadata } = parseFrontmatter(content);
    const slug = file.replace('.md', '');
    
    return {
      slug,
      ...metadata
    };
  });

  return articles;
}

function getIndexHtmlContent() {
  const indexPath = path.join(distDir, 'index.html');
  return fs.readFileSync(indexPath, 'utf-8');
}

function prerender() {
  console.log('📄 Generating static HTML files for articles...');
  
  // Wait for build to complete
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist folder not found. Build your project first with "npm run build"');
    process.exit(1);
  }

  const articles = getAllArticles();
  const indexHtml = getIndexHtmlContent();

  // Create article subdirectories and index.html files
  articles.forEach(article => {
    const articleDir = path.join(distDir, 'writings', article.slug);
    
    // Create directories recursively
    fs.mkdirSync(articleDir, { recursive: true });
    
    // Write index.html for each article
    fs.writeFileSync(path.join(articleDir, 'index.html'), indexHtml);
    console.log(`✅ ${article.slug}`);
  });

  // Create articles directory index
  const articlesDir = path.join(distDir, 'articles');
  fs.mkdirSync(articlesDir, { recursive: true });
  fs.writeFileSync(path.join(articlesDir, 'index.html'), indexHtml);
  console.log(`✅ /articles`);

  console.log(`\n✨ Prerendering complete! Generated ${articles.length} article pages.`);
}

prerender();
