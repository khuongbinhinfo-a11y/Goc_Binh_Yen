import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Remove UTF-8 BOM if present
function removeBOM(content) {
  return content.replace(/^\uFEFF/, '');
}

// Simple frontmatter parser
function parseFrontmatter(content) {
  // Remove BOM first
  content = removeBOM(content);
  
  // Match frontmatter between --- delimiters
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.log('No frontmatter match found');
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const body = match[2].trim();
  const data = {};
  
  const lines = frontmatter.split(/\r?\n/);
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }
    
    // Check for key: value pattern
    const colonMatch = line.match(/^(\w+):\s*(.*)$/);
    if (colonMatch) {
      const key = colonMatch[1];
      let value = colonMatch[2].trim();
      
      // Handle string values in quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        data[key] = value.slice(1, -1);
        i++;
        continue;
      }
      
      // Handle booleans
      if (value === 'true' || value === 'false') {
        data[key] = value === 'true';
        i++;
        continue;
      }
      
      // Handle empty value - might be array or object
      if (value === '') {
        // Look ahead to determine type
        const nextLine = lines[i + 1]?.trim();
        
        if (nextLine?.startsWith('- ')) {
          // Array
          const arr = [];
          i++;
          while (i < lines.length && lines[i].trim().startsWith('- ')) {
            const item = lines[i].trim().substring(2).replace(/^["']|["']$/g, '');
            arr.push(item);
            i++;
          }
          data[key] = arr;
          continue;
        } else if (nextLine?.match(/^\w+:/)) {
          // Object (nested key:value pairs)
          const obj = {};
          i++;
          while (i < lines.length && lines[i].startsWith('  ')) {
            const nestedMatch = lines[i].match(/^  (\w+):\s*["']?([^"']*)["']?$/);
            if (nestedMatch) {
              obj[nestedMatch[1]] = nestedMatch[2];
            }
            i++;
          }
          data[key] = obj;
          continue;
        }
      }
      
      // Simple value
      data[key] = value;
    }
    
    i++;
  }
  
  return { data, content: body };
}

function processContentDir(dirName, contentType) {
  const contentDir = path.join(process.cwd(), 'src', 'content', dirName);
  
  if (!fs.existsSync(contentDir)) {
    console.log(`Directory not found: ${contentDir}`);
    return [];
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  console.log(`Found ${files.length} files in ${dirName}`);
  
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
  
  console.log(`✅ Generated ${tamLinhContent.length} spiritual posts`);
  console.log(`✅ Generated ${keChuyenContent.length} story posts`);
  console.log(`✅ Output written to: ${outputPath}`);
}

generateContentFile();
