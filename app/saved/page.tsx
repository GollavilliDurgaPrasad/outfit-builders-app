"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SavedOutfit } from '@/components/OutfitBuilder';
import SavedOutfits from '@/components/SavedOutfits';

export default function SavedPage() {
  const [outfits, setOutfits] = useState<SavedOutfit[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedOutfits = localStorage.getItem('savedOutfits');
    if (savedOutfits) {
      try {
        setOutfits(JSON.parse(savedOutfits));
      } catch (e) {
        console.error('Failed to parse saved outfits');
      }
    }
  }, []);

  const handleRemoveOutfit = (outfitId: string) => {
    setOutfits(prev => {
      const newOutfits = prev.filter(outfit => outfit.id !== outfitId);
      localStorage.setItem('savedOutfits', JSON.stringify(newOutfits));
      return newOutfits;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Saved Outfits</h1>
      </div>
      
      <SavedOutfits 
        outfits={outfits}
        onRemove={handleRemoveOutfit}
      />
    </div>
  );
}