// app/mats/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card';
import Link from "next/link";


interface MatItem {
    id: string;
    name: string;
    weight_gsm: number;
    thickness_mm: number;
    application: string;
    tf_brands?: { name: string } | null;
    tf_suppliers?: { name: string } | null;
  }


export default async function MatsPage() {


  const { data, error } = await supabase
    .from('tf_glass_fiber_mats')
    .select(`
      id,
      name,
      weight_gsm,
      thickness_mm,
      application,
      tf_brands(name),
      tf_suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }else{
    console.log('Supabase 查询数据:', data);
  }

  const mats = data as unknown as MatItem[]

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻璃纤维短切毡产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mats?.map((item) => (
          <Link key={item.id} href={`/mats/${item.id}`}>
            <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p><span className="font-medium">克重：</span>{item.weight_gsm} g/m²</p>
                <p><span className="font-medium">厚度：</span>{item.thickness_mm} mm</p>
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
