import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imageName = searchParams.get('name')
  
  if (!imageName) {
    return new NextResponse('Image name required', { status: 400 })
  }
  
  // 解码图片名称
  const decodedName = decodeURIComponent(imageName)
  
  // 构建图片路径
  const imagesDir = path.join(process.cwd(), 'images')
  
  // 搜索匹配的图片文件
  try {
    const chapters = fs.readdirSync(imagesDir)
    
    for (const chapter of chapters) {
      const chapterPath = path.join(imagesDir, chapter)
      if (fs.statSync(chapterPath).isDirectory()) {
        const files = fs.readdirSync(chapterPath)
        const matchedFile = files.find(file => file === decodedName)
        
        if (matchedFile) {
          const imagePath = path.join(chapterPath, matchedFile)
          const imageBuffer = fs.readFileSync(imagePath)
          
          // 根据文件扩展名设置正确的 Content-Type
          const ext = path.extname(matchedFile).toLowerCase()
          let contentType = 'image/jpeg'
          if (ext === '.png') contentType = 'image/png'
          else if (ext === '.gif') contentType = 'image/gif'
          else if (ext === '.svg') contentType = 'image/svg+xml'
          else if (ext === '.webp') contentType = 'image/webp'
          
          return new NextResponse(imageBuffer, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable'
            }
          })
        }
      }
    }
    
    return new NextResponse('Image not found', { status: 404 })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
