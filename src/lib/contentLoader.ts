import fs from 'fs';
import path from 'path';
import { ContentItem, ContentType } from '@/data/contentLibrary';

// Simple frontmatter parser
function parseFrontmatter(content: string): { data: any; content: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const body = match[2].trim();
  const data: any = {};
  
  // Parse YAML-like frontmatter
  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;
  
  const lines = frontmatter.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for array continuation
    if (inArray && trimmed.startsWith('- ')) {
      currentArray.push(trimmed.substring(2).replace(/"/g, ''));
      continue;
    }
    
    // Check for key-value pair
    const colonMatch = line.match(/^(\w+):\s*(.*)$/);
    if (colonMatch) {
      // Save previous array if exists
      if (inArray && currentKey) {
        data[currentKey] = currentArray;
        currentArray = [];
        inArray = false;
      }
      
      currentKey = colonMatch[1];
      const value = colonMatch[2].trim();
      
      if (value === '') {
        // Might be an array or object, check next lines
        inArray = true;
        currentArray = [];
      } else if (value.startsWith('"') && value.endsWith('"')) {
        data[currentKey] = value.slice(1, -1);
      } else if (value === 'true') {
        data[currentKey] = true;
      } else if (value === 'false') {
        data[currentKey] = false;
      } else {
        data[currentKey] = value;
      }
    }
  }
  
  // Save last array if exists
  if (inArray && currentKey) {
    data[currentKey] = currentArray;
  }
  
  return { data, content: body };
}

function estimateReadingTime(content: string): string {
  const words = content
    .replace(/\n/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(2, Math.round(words / 170));
  return `${minutes} phút`;
}

export function loadMarkdownContent(contentType: ContentType): ContentItem[] {
  const contentDir = path.join(process.cwd(), 'src', 'content', contentType === 'spiritual' ? 'tam-linh' : 'ke-chuyen');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  return files.map((file, index) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);
    
    return {
      title: data.title || '',
      slug: data.slug || file.replace('.md', ''),
      contentType: data.contentType || contentType,
      category: data.category || (contentType === 'spiritual' ? 'Tâm linh' : 'Kể chuyện'),
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      voiceBy: data.voiceBy || 'Hồng Tâm',
      readingTime: data.readingTime || estimateReadingTime(content),
      publishedAt: data.publishedAt || '',
      content: content.trim(),
      analysis: data.analysis || {
        emotionFlow: '',
        standoutImages: '',
        meaning: '',
        memorableLine: '',
      },
      relatedPosts: data.relatedPosts || [],
      hasAudio: data.hasAudio || false,
      hasVideo: data.hasVideo || false,
      isFeatured: data.isFeatured || index === 0,
    };
  }).sort((a, b) => {
    // Sort by file name order
    return a.slug.localeCompare(b.slug);
  });
}
