"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClothingItem from "./clothing-item"
import OutfitCanvas from "./outfit-canvas"

const clothingItems = {
  tops: [
    { id: "top1", name: "White T-Shirt", image: "/tops/top1.jpg", price: 19.99, type: "tops" },
    { id: "top2", name: "Black Sweater", image: "/tops/top2.jpg", price: 29.99, type: "tops" },
    { id: "top3", name: "Blue Blouse", image: "/tops/top3.jpg", price: 24.99, type: "tops" },
    { id: "top4", name: "Red Hoodie", image: "/tops/top4.jpg", price: 34.99, type: "tops" },
  ],
  bottoms: [
    {
      id: "bottom1",
      name: "Blue Jeans",
      image: "/bottoms/bottom1.jpg",
      price: 39.99,
      type: "bottoms",
    },
    {
      id: "bottom2",
      name: "Black Pants",
      image: "/bottoms/bottom2.jpg",
      price: 44.99,
      type: "bottoms",
    },
    {
      id: "bottom3",
      name: "Khaki Shorts",
      image: "/bottoms/bottom3.jpg",
      price: 29.99,
      type: "bottoms",
    },
    {
      id: "bottom4",
      name: "Denim Skirt",
      image: "/bottoms/bottom4.jpg",
      price: 34.99,
      type: "bottoms",
    },
  ],
  shoes: [
    {
      id: "shoe1",
      name: "White Sneakers",
      image: "/shoes/shoes1.jpg",
      price: 59.99,
      type: "shoes",
    },
    {
      id: "shoe2",
      name: "Black Boots",
      image: "/shoes/shoes2.jpg",
      price: 79.99,
      type: "shoes",
    },
    {
      id: "shoe3",
      name: "Brown Loafers",
      image: "/shoes/shoes3.jpg",
      price: 69.99,
      type: "shoes",
    },
    { id: "shoe4", name: "Sandals", image: "/shoes/shoes4.jpg", price: 49.99, type: "shoes" },
  ],
  accessories: [
    {
      id: "acc1",
      name: "belt",
      image: "/accessories/belt.jpg",
      price: 29.99,
      type: "accessories",
    },
    {
      id: "acc2",
      name: "belt",
      image: "/accessories/belt2.jpg",
      price: 24.99,
      type: "accessories",
    },
    {
      id: "acc3",
      name: "cap",
      image: "/accessories/cap.jpg",
      price: 19.99,
      type: "accessories",
    },
    {
      id: "acc4",
      name: "Sunglasses",
      image: "/accessories/sunglasses.jpg",
      price: 14.99,
      type: "accessories",
    },
  ],
}

export default function OutfitBuilder() {
  const [selectedOutfit, setSelectedOutfit] = useState<
    Array<{ id: string; name: string; image: string; price: number; position: { x: number; y: number } }>
  >([])

  const addToOutfit = (item: { id: string; name: string; image: string; price: number; type?: string }) => {
    const existingItemIndex = selectedOutfit.findIndex((outfitItem) => {
      const outfitItemType = outfitItem.id.includes("top")
        ? "tops"
        : outfitItem.id.includes("bottom")
          ? "bottoms"
          : outfitItem.id.includes("shoe")
            ? "shoes"
            : "accessories"

      const newItemType =
        item.type ||
        (item.id.includes("top")
          ? "tops"
          : item.id.includes("bottom")
            ? "bottoms"
            : item.id.includes("shoe")
              ? "shoes"
              : "accessories")

      return outfitItemType === newItemType
    })

    let position = { x: 250, y: 250 }

    const canvasWidth = 500
    const canvasHeight = 500

    switch (item.type) {
      case "tops":
        position = { x: canvasWidth / 2, y: 100 }
        break
      case "bottoms":
        position = { x: canvasWidth / 2, y: 250 }
        break
      case "shoes":
        position = { x: canvasWidth / 2, y: 400 }
        break
      case "accessories":
        const side = Math.random() > 0.5 ? 1 : -1
        position = {
          x: canvasWidth / 2 + side * 100,
          y: 200 + Math.random() * 100,
        }
        break
    }

    if (existingItemIndex !== -1) {
      position = selectedOutfit[existingItemIndex].position

      const updatedOutfit = [...selectedOutfit]
      updatedOutfit[existingItemIndex] = {
        ...item,
        position,
      }
      setSelectedOutfit(updatedOutfit)
    } else {
      setSelectedOutfit([
        ...selectedOutfit,
        {
          ...item,
          position,
        },
      ])
    }
  }

  const updateItemPosition = (id: string, position: { x: number; y: number }) => {
    setSelectedOutfit(
      selectedOutfit.map((item) => {
        if (item.id === id) {
          return { ...item, position }
        }
        return item
      }),
    )
  }

  const removeFromOutfit = (id: string) => {
    setSelectedOutfit(selectedOutfit.filter((item) => item.id !== id))
  }

  const addToCart = () => {
    if (selectedOutfit.length === 0) {
      alert("empty outfit")
      return
    }

    const totalPrice = selectedOutfit.reduce((sum, item) => sum + item.price, 0)

    alert('added to cart')

    console.log("Added to cart:", selectedOutfit)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Clothing Items</h2>
          <Tabs defaultValue="tops">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="tops">Tops</TabsTrigger>
              <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
              <TabsTrigger value="shoes">Shoes</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>

            <TabsContent value="tops" className="grid grid-cols-2 gap-4">
              {clothingItems.tops.map((item) => (
                <ClothingItem key={item.id} item={item} onAddToOutfit={addToOutfit} />
              ))}
            </TabsContent>

            <TabsContent value="bottoms" className="grid grid-cols-2 gap-4">
              {clothingItems.bottoms.map((item) => (
                <ClothingItem key={item.id} item={item} onAddToOutfit={addToOutfit} />
              ))}
            </TabsContent>

            <TabsContent value="shoes" className="grid grid-cols-2 gap-4">
              {clothingItems.shoes.map((item) => (
                <ClothingItem key={item.id} item={item} onAddToOutfit={addToOutfit} />
              ))}
            </TabsContent>

            <TabsContent value="accessories" className="grid grid-cols-2 gap-4">
              {clothingItems.accessories.map((item) => (
                <ClothingItem key={item.id} item={item} onAddToOutfit={addToOutfit} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">Outfit Canvas</h2>
            <OutfitCanvas
              items={selectedOutfit}
              updateItemPosition={updateItemPosition}
              removeItem={removeFromOutfit}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
            {selectedOutfit.length === 0 ? (
              <p className="text-gray-500">No items selected. Drag clothing items to the canvas above.</p>
            ) : (
              <div className="space-y-2">
                {selectedOutfit.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2">
                  <span>Total:</span>
                  <span>${selectedOutfit.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4" onClick={addToCart}>
                  Add Outfit to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
