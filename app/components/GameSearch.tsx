// components/GameSearch.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function GameSearch() {
  type Game = {
    id: number;
    name: string;
    background_image?: string | null;
    rating?: number;
  };

  const [query, setQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`);
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Search failed');
      }
      
      const data = await res.json();
      setGames(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && search()}
        placeholder="Search 500,000+ games..."
        className="w-full p-4 bg-gray-800 text-white rounded-lg"
      />
      
      {loading && <p className="text-cyan-400">Searching the galaxy...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {game.background_image ? (
              <Image src={game.background_image} alt={game.name} width={300} height={250} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">No image</div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-white">{game.name}</h3>
              <p className="text-sm text-gray-400">Rating: {game.rating}/5 ★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}