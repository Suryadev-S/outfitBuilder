"use client"

import { useDrop } from "react-dnd"
import { X } from "lucide-react"
import DraggableItem from "./draggable-item"
import { useEffect, useRef } from "react"

interface OutfitCanvasProps {
  items: Array<{
    id: string
    name: string
    image: string
    price: number
    position: { x: number; y: number }
  }>
  updateItemPosition: (id: string, position: { x: number; y: number }) => void
  removeItem: (id: string) => void
}

export default function OutfitCanvas({ items, updateItemPosition, removeItem }: OutfitCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "clothing-item",
    drop: (item: { id: string; name: string; image: string; price: number; type?: string }, monitor) => {
  
      if (!monitor.didDrop()) {
        const delta = monitor.getClientOffset()
        const canvasRect = document.getElementById("outfit-canvas")?.getBoundingClientRect()

        if (delta && canvasRect) {
         
          const x = delta.x - canvasRect.left
          let y = delta.y - canvasRect.top

         
          if (item.type) {
            const canvasWidth = canvasRect.width
            const canvasHeight = canvasRect.height

            switch (item.type) {
              case "tops":
                y = Math.min(y, canvasHeight * 0.3) 
                break
              case "bottoms":
                y = canvasHeight * 0.4 + canvasHeight * 0.2 * Math.random() 
                break
              case "shoes":
                y = Math.max(y, canvasHeight * 0.7) 
                break
            }
          }

          return {
            id: item.id,
            position: { x, y },
          }
        }
      }
      return undefined
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current)
    }
  }, [drop])
  return (
    <div
      id="outfit-canvas"
      ref={canvasRef}
      className={`relative w-full h-[500px] border-2 rounded-lg ${isOver ? "border-primary border-dashed" : "border-gray-200"
        } bg-gray-50 overflow-hidden`}
    >
      {items.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <p>Drag and drop clothing items here</p>
        </div>
      ) : (
        items.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            position={item.position}
            updatePosition={(position) => updateItemPosition(item.id, position)}
          >
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeItem(item.id)
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <X className="h-3 w-3" />
              </button>
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 object-contain"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </DraggableItem>
        ))
      )}
    </div>
  )
}
