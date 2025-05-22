// app/meshes/page.tsx
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

interface MeshItem {
  id: string;
  name: string;
  weight_gsm: number;
  mesh_size_mm: string;
  treatment: string;
  application: string;
  brands?: { name: string } | null;
  suppliers?: { name: string } | null;
}

export default async function MeshesPage() {
  const { data, error } = await supabase
    .from('glass_fiber_meshes')
    .select(`
      id,
      name,
      weight_gsm,
      mesh_size_mm,
      treatment,
      application,
      brands(name),
      suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }

  const meshes = data as unknown as MeshItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻璃纤维网格布产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meshes?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p><span className="font-medium">克重：</span>{item.weight_gsm} g/m²</p>
              <p><span className="font-medium">网孔大小：</span>{item.mesh_size_mm}</p>
              <p><span className="font-medium">表面处理：</span>{item.treatment}</p>
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
