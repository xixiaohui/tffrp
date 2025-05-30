// app/tapes/page.tsx
import { supabase } from '@/lib/supabase';
// import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";

import ProductCard  from '@/components/ProductCard';

export interface TapeItem {
  id: string;
  name: string;
  thickness_mm: number;
  width_mm: number;
  adhesive_type: string;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default async function TapesPage() {
  const { data, error } = await supabase
    .from('tf_glass_fiber_tapes')
    .select(`
      id,
      name,
      thickness_mm,
      width_mm,
      adhesive_type,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('Failed to load:', error.message);
    return <div className="p-4 text-red-500">Failed to load, please try again later: {error.message}</div>;
  }

  const tapes = data as unknown as TapeItem[];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Glass Fiber Tape Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tapes?.map((item) => (
          <Link key={item.id} href={`/tapes/${item.id}`}>
            {/* <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">Thickness:</span> {item.thickness_mm} mm</p>
                <p><span className="font-medium">Width:</span> {item.width_mm} mm</p>
                <p><span className="font-medium">Adhesive Type:</span> {item.adhesive_type || '—'}</p>
                <p><span className="font-medium">Application:</span> {item.application}</p>
                <p><span className="font-medium">Brand:</span> {item.tf_brands?.name || '—'}</p>
                <p><span className="font-medium">Supplier:</span> {item.tf_suppliers?.name || '—'}</p>
              </CardContent>
            </Card> */}

            <ProductCard key={item.id} product={item}/>
          </Link>
        ))}
      </div>
    </div>
  );
}
