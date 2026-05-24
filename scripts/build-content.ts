import fs from 'fs';
import path from 'path';

// Simple frontmatter parser
function parseFrontmatter(content: string): { data: any; content: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const body = match[2].trim();
  const data: any = {};
  
  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;
  let inObject = false;
  let currentObject: any = {};
  
  const lines = frontmatter.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (inObject && trimmed.startsWith('  ') && trimmed.includes(':')) {
      const objMatch = trimmed.match(/^(\w+):\s*"?([^"]*)"?$/);
      if (objMatch) {
        currentObject[objMatch[1]] = objMatch[2];
      }
      continue;
    } else if (inObject && trimmed !== '' && !trimmed.startsWith('  ')) {
      data[currentKey] = currentObject;
      inObject = false;
      currentObject = {};
    }
    
    if (inArray && trimmed.startsWith('- ')) {
      currentArray.push(trimmed.substring(2).replace(/^"|"$/g, ''));
      continue;
    } else if (inArray && trimmed !== '' && !trimmed.startsWith('- ')) {
      data[currentKey] = currentArray;
      inArray = false;
      currentArray = [];
    }
    
    const colonMatch = line.match(/^(\w+):\s*(.*)$/);
    if (colonMatch) {
      currentKey = colonMatch[1];
      const value = colonMatch[2].trim();
      
      if (value === '' || value === '|') {
        const nextLine = lines[i + 1]?.trim();
        if (nextLine?.startsWith('- ')) {
          inArray = true;
          currentArray = [];
        } else if (nextLine?.startsWith('  ')) {
          inObject = true;
          currentObject = {};
        }
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
  
  if (inArray && currentKey) {
    data[currentKey] = currentArray;
  }
  if (inObject && currentKey) {
    data[currentKey] = currentObject;
  }
  
  return { data, content: body };
}

function processContentDir(dirName: string, contentType: string) {
  const contentDir = path.join(process.cwd(), 'src', 'content', dirName);
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  return files.map((file, index) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);
    
    const words = content.replace(/\n/g, ' ').split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(2, Math.round(words / 170));
    
    return {
      title: data.title || '',
      slug: data.slug || file.replace('.md', ''),
      contentType: contentType,
      category: data.category || (contentType === 'spiritual' ? 'Tâm linh' : 'Kể chuyện'),
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      voiceBy: data.voiceBy || 'Hồng Tâm',
      readingTime: data.readingTime || `${minutes} phút`,
      publishedAt: data.publishedAt || '',
      content: content,
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
  }).sort((a, b) => a.slug.localeCompare(b.slug));
}

function generateContentFile() {
  const tamLinhContent = processContentDir('tam-linh', 'spiritual');
  const keChuyenContent = processContentDir('ke-chuyen', 'story');
  
  const output = `// Auto-generated from markdown files
// Do not edit manually

import { ContentItem } from './contentLibrary';

export const markdownSpiritualPosts: ContentItem[] = ${JSON.stringify(tamLinhContent, null, 2)};

export const markdownStoryPosts: ContentItem[] = ${JSON.stringify(keChuyenContent, null, 2)};
`;
  
  const outputPath = path.join(process.cwd(), 'src', 'data', 'markdownContent.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');
  
  console.log(`Generated ${tamLinhContent.length} spiritual posts`);
  console.log(`Generated ${keChuyenContent.length} story posts`);
  console.log(`Output written to: ${outputPath}`);
}

generateContentFile();
