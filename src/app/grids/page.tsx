// app/grids/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card';

interface GridItem {
  id: string;
  name: string;
  weight_gsm: number;
  mesh_size_mm: string;
  tensile_strength_mpa: number;
  application: string;
  brands?: { name: string } | null;
  suppliers?: { name: string } | null;
}

export default async function GridsPage() {
  const { data, error } = await supabase
    .from('glass_fiber_grids')
    .select(`
      id,
      name,
      weight_gsm,
      mesh_size_mm,
      tensile_strength_mpa,
      application,
      brands(name),
      suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }

  const grids = data as unknown as GridItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻纤格栅产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grids?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p><span className="font-medium">克重：</span>{item.weight_gsm} g/m²</p>
              <p><span className="font-medium">网格尺寸：</span>{item.mesh_size_mm} mm</p>
              <p><span className="font-medium">抗拉强度：</span>{item.tensile_strength_mpa} MPa</p>
              <p><span className="font-medium">应用：</span>{item.application}</p>
              <p><span className="font-medium">品牌：</span>{item.brands?.name || '—'}</p>
              <p><span className="font-medium">供应商：</span>{item.suppliers?.name || '—'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
