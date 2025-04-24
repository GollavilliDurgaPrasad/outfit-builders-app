"use client";

import { SavedOutfit } from "./OutfitBuilder";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Clock, ShoppingCart, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface CartProps {
  outfits: SavedOutfit[];
  onRemove: (outfitId: string) => void;
  showHeader?: boolean;
}

export default function Cart({ outfits, onRemove, showHeader = true }: CartProps) {
  return (
    <div className="bg-card rounded-lg shadow-md flex flex-col min-h-[500px]">
      {showHeader && (
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="font-semibold text-xl">Saved Outfits</h2>
          </div>
        </div>
      )}
      
      {outfits.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-muted-foreground">
          <ShoppingCart className="h-12 w-12 mb-2 opacity-50" />
          <p>Your cart is empty</p>
          <p className="text-sm">Save an outfit to see it here</p>
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

      {outfits.length > 0 && (
        <div className="p-4 border-t">
          <Button className="w-full" size="lg">
            <span>Proceed to Checkout</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
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
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onRemove(outfit.id)}
        >
          Remove
        </Button>
      </div>
      
      <Separator className="my-3" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {outfit.items.map((item) => (
          <div key={item.id} className="bg-muted rounded-md p-2">
            <div className="aspect-square relative mb-2">
              {/* Sample image placeholder - replace with actual product images */}
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