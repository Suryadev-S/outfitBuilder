"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useDrag } from "react-dnd"

interface DraggableItemProps {
  id: string
  position: { x: number; y: number }
  updatePosition: (position: { x: number; y: number }) => void
  children: React.ReactNode
}

// Update the DraggableItem component to prevent unintended movement
export default function DraggableItem({ id, position, updatePosition, children }: DraggableItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "canvas-item",
    item: { id, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Only update position when actually dragging, not on random clicks
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Only process if we were actually dragging the item
      if (isDragging && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const canvasRect = document.getElementById("outfit-canvas")?.getBoundingClientRect()

        if (canvasRect) {
          const x = rect.left - canvasRect.left + rect.width / 2
          let y = rect.top - canvasRect.top + rect.height / 2

          // Get the item type from the data attribute
          const itemType = ref.current.getAttribute("data-type")

          // Apply positioning constraints based on item type
          if (itemType) {
            const canvasHeight = canvasRect.height

            switch (itemType) {
              case "tops":
                y = Math.min(y, canvasHeight * 0.3) // Keep tops in the top 30% of canvas
                break
              case "bottoms":
                y = Math.max(Math.min(y, canvasHeight * 0.6), canvasHeight * 0.4) // Middle area
                break
              case "shoes":
                y = Math.max(y, canvasHeight * 0.7) // Keep shoes in bottom 30% of canvas
                break
              // Accessories can be placed anywhere
            }
          }

          updatePosition({ x, y })
        }
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [updatePosition, isDragging])

  // Set initial position
  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${position.x}px`
      ref.current.style.top = `${position.y}px`
    }
  }, [position])

  // Add data-type attribute to the div
  return (
    <div
      ref={(node) => {
        drag(node)
        if (node) {
          ref.current = node
        }
      }}
      data-type={
        id.includes("top") ? "tops" : id.includes("bottom") ? "bottoms" : id.includes("shoe") ? "shoes" : "accessories"
      }
      className={`absolute cursor-move transition-opacity ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={{
        transform: "translate(-50%, -50%)",
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 1,
      }}
    >
      {children}
    </div>
  )
}
