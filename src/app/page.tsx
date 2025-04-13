import OutfitBuilder from "@/components/outfit-builder"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Outfit Builder</h1>
        <p className="text-center mb-8 text-gray-600">Drag and drop clothing items to create your perfect outfit</p>
        <OutfitBuilder />
      </div>
    </main>
  )
}
