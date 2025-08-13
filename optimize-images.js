import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_DIR = './src/images';
const OUTPUT_DIR = './src/images/optimized';
const QUALITY = 80;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculate new dimensions while maintaining aspect ratio
    let { width, height } = metadata;
    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }
    if (height > MAX_HEIGHT) {
      width = Math.round((width * MAX_HEIGHT) / height);
      height = MAX_HEIGHT;
    }
    
    // Create optimized versions
    await image
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));
    
    // Also create a JPEG version for fallback
    await image
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY })
      .toFile(outputPath.replace(/\.[^.]+$/, '.jpg'));
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function processDirectory(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        // Create optimized subdirectory
        const optimizedSubDir = fullPath.replace(INPUT_DIR, OUTPUT_DIR);
        await fs.mkdir(optimizedSubDir, { recursive: true });
        await processDirectory(fullPath);
      } else if (item.isFile() && /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(item.name)) {
        // Create optimized directory if it doesn't exist
        const optimizedDir = path.dirname(fullPath).replace(INPUT_DIR, OUTPUT_DIR);
        await fs.mkdir(optimizedDir, { recursive: true });
        
        // Optimize image
        const outputPath = fullPath.replace(INPUT_DIR, OUTPUT_DIR);
        await optimizeImage(fullPath, outputPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`📁 Input directory: ${INPUT_DIR}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`⚙️  Quality: ${QUALITY}%`);
  console.log(`📏 Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}`);
  console.log('');
  
  try {
    await processDirectory(INPUT_DIR);
    console.log('');
    console.log('🎉 Image optimization completed!');
    console.log('💡 You can now update your imports to use the optimized images.');
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
  }
}

// Run the optimization
main().catch(error => {
  console.error('❌ Optimization failed:', error.message);
  process.exit(1);
});
