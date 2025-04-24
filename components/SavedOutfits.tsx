"use client";

import { SavedOutfit } from "./OutfitBuilder";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Clock, Bookmark, ShoppingCart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface SavedOutfitsProps {
  outfits: SavedOutfit[];
  onRemove: (outfitId: string) => void;
}

export default function SavedOutfits({ outfits, onRemove }: SavedOutfitsProps) {
  return (
    <div className="bg-card rounded-lg shadow-md flex flex-col min-h-[500px]">
      {outfits.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-muted-foreground">
          <Bookmark className="h-12 w-12 mb-2 opacity-50" />
          <p>No saved outfits</p>
          <p className="text-sm">Your saved outfits will appear here</p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {outfits.map((outfit) => (
              <OutfitCard 
                key={outfit.id} 
                outfit={outfit} 
                onRemove={onRemove} 
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function OutfitCard({ outfit, onRemove }: { outfit: SavedOutfit; onRemove: (id: string) => void }) {
  const itemCount = outfit.items.length;
  const timeAgo = formatDistanceToNow(outfit.timestamp, { addSuffix: true });
  
  return (
    <div className="bg-background rounded-md p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">Outfit with {itemCount} item{itemCount !== 1 ? 's' : ''}</h3>
          <div className="flex items-center text-muted-foreground text-xs mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>{timeAgo}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              const savedCart = localStorage.getItem('outfitBuilderCart');
              const currentCart = savedCart ? JSON.parse(savedCart) : [];
              const updatedCart = [outfit, ...currentCart];
              localStorage.setItem('outfitBuilderCart', JSON.stringify(updatedCart));
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onRemove(outfit.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {outfit.items.map((item) => (
          <div key={item.id} className="bg-muted rounded-md p-2">
            <div className="aspect-square relative mb-2">
              <Image
                src={`https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=300`}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}