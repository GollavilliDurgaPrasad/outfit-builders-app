# Outfit Builder

An interactive drag-and-drop outfit builder web application built with Next.js and @dnd-kit.

## Features

- Drag-and-drop interface for mixing and matching clothing items
- Multiple clothing variants (3 per category)
- Virtual canvas with proper layering
- Save outfits and add them to cart
- Responsive design for all devices
- Local storage persistence

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Core Features

### Drag-and-Drop Interface

The application uses @dnd-kit for smooth drag-and-drop interactions. Users can drag clothing items from the sidebar and drop them onto the canvas.

### Clothing Categories and Variants

Each clothing category (shirts, pants, jackets, dresses, hats, shoes) has multiple variants with different styles and colors.

### Virtual Canvas

The canvas displays the outfit with proper layering of clothing items. Items are positioned appropriately based on their type.

### Cart Integration

Users can save outfits to their cart. The cart persists between sessions using localStorage.

## Adding New Clothing Variants

To add new clothing variants, edit the `data/clothing.tsx` file:

1. Add a new item to the appropriate category
2. Provide a unique ID, name, category, and image

Example:

```tsx
{
  id: "shirt-4",
  name: "Graphic Tee",
  category: "shirts",
  image: <Shirt className="h-full w-full text-blue-500" strokeWidth={1.5} />,
}
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- @dnd-kit (Drag and Drop)
- shadcn/ui (UI Components)
- date-fns (Date formatting)
- Lucide React (Icons)