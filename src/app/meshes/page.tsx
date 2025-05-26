// app/meshes/page.tsx
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";

interface MeshItem {
  id: string;
  name: string;
  weight_gsm: number;
  mesh_size_mm: string;
  treatment: string;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default async function MeshesPage() {
  const { data, error } = await supabase
    .from('tf_glass_fiber_meshes')
    .select(`
      id,
      name,
      weight_gsm,
      mesh_size_mm,
      treatment,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('Loading failed:', error.message);
    return <div className="p-4 text-red-500">Loading failed, please try again later: {error.message}</div>;
  }

  const meshes = data as unknown as MeshItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Glass Fiber Mesh Fabric Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meshes?.map((item) => (
          <Link key={item.id} href={`/meshes/${item.id}`}>
            <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">Weight:</span> {item.weight_gsm} g/m²</p>
                <p><span className="font-medium">Mesh Size:</span> {item.mesh_size_mm}</p>
                <p><span className="font-medium">Surface Treatment:</span> {item.treatment}</p>
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
