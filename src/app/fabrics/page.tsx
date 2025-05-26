// app/fabrics/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";

interface FabricItem {
  id: string;
  name: string;
  weight_gsm: number;
  weave_type: string;
  width_mm: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default async function FabricsPage() {
  const { data, error } = await supabase
    .from('tf_glass_fiber_fabrics')
    .select(`
      id,
      name,
      weight_gsm,
      weave_type,
      width_mm,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('Loading failed:', error.message);
    return <div className="p-4 text-red-500">Loading failed: {error.message}</div>;
  }

  const fabrics = data as unknown as FabricItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Glass Fiber Fabrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fabrics?.map((item) => (
          <Link key={item.id} href={`/fabrics/${item.id}`}>
            <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">Weight：</span>{item.weight_gsm} g/m²</p>
                <p><span className="font-medium">Weave Type: </span>{item.weave_type}</p>
                <p><span className="font-medium">Width：</span>{item.width_mm} mm</p>
                <p><span className="font-medium">Application：</span>{item.application}</p>
                <p><span className="font-medium">Brand：</span>{item.tf_brands?.name || '—'}</p>
                <p><span className="font-medium">Supplier：</span>{item.tf_suppliers?.name || '—'}</p>
              </CardContent>
            </Card>
          </Link>
          
        ))}
      </div>
    </div>
  );
}
