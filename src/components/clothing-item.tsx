"use client"

import { useEffect, useRef } from "react"
import { useDrag } from "react-dnd"

interface ClothingItemProps {
  item: {
    id: string
    name: string
    image: string
    price: number
    type?: string// Add type property
  }
  onAddToOutfit: (item: { id: string; name: string; image: string; price: number; type?: string }) => void
}

export default function ClothingItem({ item, onAddToOutfit }: ClothingItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "clothing-item",
    item: { ...item },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onAddToOutfit(item)
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  useEffect(() => {
    if (ref.current) {
      drag(ref.current)
    }
  }, [drag])
  return (
    <div
      ref={ref}
      className={`bg-white border rounded-md p-2 cursor-grab transition-opacity ${isDragging ? "opacity-50" : "opacity-100"
        }`}
    >
      <div className="flex flex-col items-center">
        <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden mb-2">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-sm font-medium text-center mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
