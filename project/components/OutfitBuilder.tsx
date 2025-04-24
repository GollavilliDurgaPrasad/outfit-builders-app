"use client";

import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { ShoppingCart, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Canvas from '@/components/Canvas';
import { clothingCategories } from '@/data/clothing';
import { Button } from '@/components/ui/button';

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  image: React.ReactNode;
  position?: { x: number; y: number };
}

export interface SavedOutfit {
  id: string;
  items: ClothingItem[];
  timestamp: number;
}

export default function OutfitBuilder() {
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(null);
  const [canvasItems, setCanvasItems] = useState<ClothingItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const savedCart = localStorage.getItem('outfitBuilderCart');
    const savedOutfits = localStorage.getItem('savedOutfits');
    
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        setCartCount(cart.length);
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
    
    if (savedOutfits) {
      try {
        const outfits = JSON.parse(savedOutfits);
        setSavedCount(outfits.length);
      } catch (e) {
        console.error('Failed to parse saved outfits');
      }
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const item = clothingCategories
      .flatMap(category => category.items)
      .find(item => item.id === active.id);
    
    if (item) {
      setActiveItem({ ...item });
    }
  };

  const handleDragEnd = (event: any) => {
    const { over } = event;
    setActiveItem(null);

    if (over && over.id === 'canvas') {
      const itemToAdd = clothingCategories
        .flatMap(category => category.items)
        .find(item => item.id === event.active.id);
      
      if (itemToAdd) {
        setCanvasItems(prevItems => {
          const existingItem = prevItems.find(item => item.category === itemToAdd.category);
          
          if (existingItem) {
            return prevItems.map(item => 
              item.category === itemToAdd.category ? itemToAdd : item
            );
          }
          
          return [...prevItems, itemToAdd];
        });
      }
    }
  };

  const handleReset = () => {
    if (canvasItems.length === 0) return;
    setCanvasItems([]);
  };

  const handleRemoveItem = (itemId: string) => {
    setCanvasItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleSaveOutfit = () => {
    if (canvasItems.length === 0) return;

    const savedOutfits = localStorage.getItem('savedOutfits');
    const currentOutfits = savedOutfits ? JSON.parse(savedOutfits) : [];

    const newOutfit: SavedOutfit = {
      id: `outfit-${Date.now()}`,
      items: [...canvasItems],
      timestamp: Date.now(),
    };

    const updatedOutfits = [newOutfit, ...currentOutfits];
    localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
    setSavedCount(updatedOutfits.length);
  };

  const handleAddToCart = () => {
    if (canvasItems.length === 0) return;

    const savedCart = localStorage.getItem('outfitBuilderCart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];

    const newOutfit: SavedOutfit = {
      id: `outfit-${Date.now()}`,
      items: [...canvasItems],
      timestamp: Date.now(),
    };

    const updatedCart = [newOutfit, ...currentCart];
    localStorage.setItem('outfitBuilderCart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Outfit Builder</h1>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push('/saved')}
            className="relative"
          >
            <Bookmark className="h-5 w-5" />
            {savedCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {savedCount}
              </span>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push('/cart')}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar />
          <Canvas 
            items={canvasItems} 
            onRemoveItem={handleRemoveItem}
          />
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button variant="outline" onClick={handleReset}>Reset Outfit</Button>
          <Button variant="secondary" onClick={handleSaveOutfit}>Save Outfit</Button>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>

        <DragOverlay>
          {activeItem && (
            <div className="opacity-70 w-16 h-16 relative">
              {activeItem.image}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}