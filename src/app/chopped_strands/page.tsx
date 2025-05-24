// app/chopped-strands/page.tsx
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";

interface ChoppedStrandItem {
  id: string;
  name: string;
  length_mm: number;
  diameter_um: number;
  compatibility: string;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default async function ChoppedStrandsPage() {
  const { data, error } = await supabase
    .from('tf_glass_fiber_chopped_strands')
    .select(`
      id,
      name,
      length_mm,
      diameter_um,
      compatibility,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }

  const strands = data as unknown as ChoppedStrandItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻璃纤维短切原丝</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strands?.map((item) => (
          <Link key={item.id} href={`/chopped_strands/${item.id}`}>
            <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">长度：</span>{item.length_mm} mm</p>
                <p><span className="font-medium">直径：</span>{item.diameter_um} μm</p>
                <p><span className="font-medium">适配树脂：</span>{item.compatibility}</p>
                <p><span className="font-medium">应用：</span>{item.application}</p>
                <p><span className="font-medium">品牌：</span>{item.tf_brands?.name || '—'}</p>
                <p><span className="font-medium">供应商：</span>{item.tf_suppliers?.name || '—'}</p>
              </CardContent>
            </Card>
          </Link>
          
        ))}
      </div>
    </div>
  );
}
