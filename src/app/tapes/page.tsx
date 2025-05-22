// app/tapes/page.tsx
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

interface TapeItem {
  id: string;
  name: string;
  thickness_mm: number;
  width_mm: number;
  adhesive_type: string;
  application: string;
  brands?: { name: string } | null;
  suppliers?: { name: string } | null;
}

export default async function TapesPage() {
  const { data, error } = await supabase
    .from('glass_fiber_tapes')
    .select(`
      id,
      name,
      thickness_mm,
      width_mm,
      adhesive_type,
      application,
      brands(name),
      suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }

  const tapes = data as unknown as TapeItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻璃纤维胶带产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tapes?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p><span className="font-medium">厚度：</span>{item.thickness_mm} mm</p>
              <p><span className="font-medium">宽度：</span>{item.width_mm} mm</p>
              <p><span className="font-medium">胶类型：</span>{item.adhesive_type || '—'}</p>
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
