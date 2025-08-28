"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)

  const openImage = (index: number) => {
    setSelectedIndex(index)
    setZoom(1)
  }

  const closeImage = () => {
    setSelectedIndex(null)
    setZoom(1)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
      setZoom(1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1)
      setZoom(1)
    }
  }

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  return (
    <>
      {/* 图片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            onClick={() => openImage(index)}
          >
            <img
              src={src}
              alt={`图片 ${index + 1}`}
              className="w-full h-auto object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm">点击查看大图</p>
            </div>
          </div>
        ))}
      </div>

      {/* 图片查看器 */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeImage}
        >
          {/* 工具栏 */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                zoomOut()
              }}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                zoomIn()
              }}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                closeImage()
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* 图片计数 */}
          <div className="absolute top-4 left-4 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* 上一张按钮 */}
          {selectedIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {/* 下一张按钮 */}
          {selectedIndex < images.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          {/* 图片 */}
          <div
            className="max-w-[90vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex]}
              alt={`图片 ${selectedIndex + 1}`}
              className="max-w-full h-auto"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center",
                transition: "transform 0.2s"
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
