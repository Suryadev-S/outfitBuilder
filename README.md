# 🧥 Outfit Builder

An interactive outfit builder web application built with **Next.js**, featuring drag-and-drop clothing selection, a customizable canvas, and a shopping cart experience. Perfect for styling, fashion demos, or e-commerce experimentation.

## ✨ Features

- Drag and drop clothing items to build an outfit
- Custom positioning with snapping and type-based layout constraints
- Shopping cart integration to review selected pieces
- Sleek UI with **shadcn/ui** and **Tailwind CSS**

---

## 🛠️ Tech Stack

- **Next.js** – React framework for production-grade apps
- **React** – UI library for building reusable components
- **React DnD** – Powerful drag-and-drop utilities for React
- **shadcn/ui** – Accessible and stylish UI components
- **Tailwind CSS** – Utility-first CSS for rapid styling

---

## 🧩 Component Structure

### 1. `OutfitBuilder` – Main Orchestrator  
📁 `components/outfit-builder.tsx`

- Central controller of the application
- Manages state for outfit items
- Handles adding, updating, and removing items
- Integrates shopping cart functionality

---

### 2. `ClothingItem` – Sidebar Items  
📁 `components/clothing-item.tsx`

- Represents each clothing item in the catalog
- Enables dragging using React DnD
- Displays image, name, and price

---

### 3. `OutfitCanvas` – Outfit Canvas  
📁 `components/outfit-canvas.tsx`

- Drop zone for clothing items
- Arranges layout and enforces type-based positioning
- Coordinates drag targets with placement rules

---

### 4. `DraggableItem` – Canvas Items  
📁 `components/draggable-item.tsx`

- Makes items draggable **within** the canvas
- Maintains position and enforces movement constraints
- Prevents unintended item shifts or overlap

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/outfit-builder.git
cd outfit-builder

# Install dependencies
npm install

# Run the development server
npm run dev
