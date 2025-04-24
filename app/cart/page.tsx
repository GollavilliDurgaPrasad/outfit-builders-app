"use client";

import { useState, useEffect } from 'react';
import Cart from '@/components/Cart';
import { SavedOutfit } from '@/components/OutfitBuilder';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CartPage() {
  const [outfits, setOutfits] = useState<SavedOutfit[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('outfitBuilderCart');
    if (savedCart) {
      try {
        setOutfits(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
  }, []);

  const handleRemoveFromCart = (outfitId: string) => {
    setOutfits(prev => {
      const newOutfits = prev.filter(outfit => outfit.id !== outfitId);
      localStorage.setItem('outfitBuilderCart', JSON.stringify(newOutfits));
      return newOutfits;
    });
    toast.info('Outfit removed from cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>
      
      <Cart 
        outfits={outfits}
        onRemove={handleRemoveFromCart}
        showHeader={false}
      />
    </div>
  );
}