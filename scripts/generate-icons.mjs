import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const svgPath = join(rootDir, 'src/app/icon.svg')
const iconsDir = join(rootDir, 'public/icons')

mkdirSync(iconsDir, { recursive: true })

const svgBuffer = readFileSync(svgPath)

const sizes = [192, 512]

for (const size of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, `icon-${size}.png`))
  console.log(`Generated icon-${size}.png`)
}

console.log('Done!')
