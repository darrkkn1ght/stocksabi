import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

const colorMap = {
  '#174B3A': '#17243A', // Forest Green -> Slate Navy
  '#174b3a': '#17243A',
  '#D7F36B': '#356AE6', // Lime Green -> Electric Blue
  '#d7f36b': '#356AE6',
  '#10372B': '#111b2b', // Darker Forest -> Darker Navy
  '#E8F1EC': '#DDE8FF', // Light Green bg -> Light Blue bg
  '#CBDDD2': '#b3c9fc'  // Green border -> Blue border
}

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf-8')
    let original = content
    
    for (const [oldColor, newColor] of Object.entries(colorMap)) {
      content = content.split(oldColor).join(newColor)
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8')
      console.log('Updated:', filePath)
    }
  }
})
console.log('Rebranding complete!')
