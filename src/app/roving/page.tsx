// app/roving/page.tsx
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";

interface RovingItem {
  id: string;
  name: string;
  tex: number;
  mtype: string;
  compatible_resin: string;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default async function RovingPage() {
  const { data, error } = await supabase
    .from('tf_glass_fiber_roving')
    .select(`
      id,
      name,
      tex,
      mtype,
      compatible_resin,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('Failed to load:', error.message);
    return <div className="p-4 text-red-500">Failed to load, please try again later: {error.message}</div>;
  }

  const rovings = data as unknown as RovingItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Glass Fiber Roving Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rovings?.map((item) => (
          <Link key={item.id} href={`/roving/${item.id}`}>
            <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">Linear Density:</span> {item.tex} tex</p>
                <p><span className="font-medium">Type:</span> {item.mtype}</p>
                <p><span className="font-medium">Compatible Resin:</span> {item.compatible_resin}</p>
                <p><span className="font-medium">Application:</span> {item.application}</p>
                <p><span className="font-medium">Brand:</span> {item.tf_brands?.name || '—'}</p>
                <p><span className="font-medium">Supplier:</span> {item.tf_suppliers?.name || '—'}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
