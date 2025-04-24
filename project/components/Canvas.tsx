"use client";

import { useDroppable } from "@dnd-kit/core";
import { ClothingItem } from "./OutfitBuilder";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CanvasProps {
  items: ClothingItem[];
  onRemoveItem: (itemId: string) => void;
}

export default function Canvas({ items, onRemoveItem }: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  const sortedItems = [...items].sort((a, b) => {
    // Define order of clothing types for layering
    const order: Record<string, number> = {
      hats: 5,
      jackets: 4,
      shirts: 3,
      dresses: 2,
      pants: 1, 
      shoes: 0
    };
    
    return (order[b.category] || 0) - (order[a.category] || 0);
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "bg-card rounded-lg shadow-md p-1 min-h-[450px] flex-1 flex flex-col justify-center items-center border-2 border-dashed",
        isOver ? "border-primary/50 bg-primary/5" : "border-border",
        "transition-colors duration-200 relative"
      )}
    >
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-2 text-muted-foreground">
        <h2 className="font-semibold text-sm">Canvas</h2>
        <p className="text-xs">Drag items here</p>
      </div>

      {items.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center">
          <div className="w-32 h-32 border-2 border-dashed border-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">👕</span>
          </div>
          <p>Drop clothing items here</p>
        </div>
      ) : (
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {sortedItems.map((item) => (
            <div 
              key={item.id} 
              className="absolute transition-all duration-300 flex items-center justify-center group"
              style={getPositionForItem(item)}
            >
              <button 
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity z-10"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <X className="h-3 w-3" />
              </button>
              <div className="w-full h-full">
                {item.image}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getPositionForItem(item: ClothingItem): React.CSSProperties {
  // Default positioning based on clothing type
  switch (item.category) {
    case 'hats':
      return { top: '5%', left: '50%', transform: 'translateX(-50%)', width: '25%', height: '20%' };
    case 'shirts':
      return { top: '25%', left: '50%', transform: 'translateX(-50%)', width: '35%', height: '30%' };
    case 'jackets':
      return { top: '23%', left: '50%', transform: 'translateX(-50%)', width: '40%', height: '35%' };
    case 'dresses':
      return { top: '20%', left: '50%', transform: 'translateX(-50%)', width: '40%', height: '60%' };
    case 'pants':
      return { top: '55%', left: '50%', transform: 'translateX(-50%)', width: '30%', height: '35%' };
    case 'shoes':
      return { top: '85%', left: '50%', transform: 'translateX(-50%)', width: '25%', height: '15%' };
    default:
      return { position: 'relative' };
  }
}