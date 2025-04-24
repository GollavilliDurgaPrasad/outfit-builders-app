"use client";

import { useDraggable } from "@dnd-kit/core";
import { clothingCategories } from "@/data/clothing";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <aside className="bg-card rounded-lg shadow-md p-4 min-w-[240px]">
      <h2 className="font-semibold text-xl mb-4">Clothing Items</h2>
      <div className="space-y-2">
        {clothingCategories.map((category) => (
          <CategorySection 
            key={category.id} 
            category={category}
            isExpanded={expandedCategory === category.id}
            onToggle={() => setExpandedCategory(
              expandedCategory === category.id ? null : category.id
            )}
          />
        ))}
      </div>
    </aside>
  );
}

function CategorySection({ 
  category, 
  isExpanded, 
  onToggle 
}: { 
  category: any; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button 
        className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            {category.icon}
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-3 gap-2 p-2">
          {category.items.map((item: any) => (
            <DraggableItem 
              key={item.id} 
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DraggableItem({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
  });
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex flex-col items-center p-2 cursor-grab rounded-md",
        "hover:bg-accent transition-colors duration-200",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      title={item.name}
    >
      <div className="w-16 h-16 relative rounded-md overflow-hidden mb-1">
        {item.image}
      </div>
      <span className="text-xs text-center line-clamp-1">{item.name}</span>
    </div>
  );
}