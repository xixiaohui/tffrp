// app/grids/page.tsx
import { supabase } from '@/lib/supabase'
// import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";

import ProductCard  from '@/components/ProductCard';

interface GridItem {
  id: string;
  name: string;
  weight_gsm: number;
  mesh_size_mm: string;
  tensile_strength_mpa: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default async function GridsPage() {
  const { data, error } = await supabase
    .from('tf_glass_fiber_grids')
    .select(`
      id,
      name,
      mesh_size_mm,
      weight_gsm,
      width_mm,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('Loading failed:', error.message);
    return <div className="p-4 text-red-500">Loading failed, please try again later: {error.message}</div>;
  }

  const grids = data as unknown as GridItem[];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Glass Fiber Grid Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {grids?.map((item) => (
          <Link key={item.id} href={`/grids/${item.id}`}>
            {/* <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">Weight:</span> {item.weight_gsm} g/m²</p>
                <p><span className="font-medium">Mesh Size:</span> {item.mesh_size_mm} mm</p>
                <p><span className="font-medium">Tensile Strength:</span> {item.tensile_strength_mpa} MPa</p>
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
