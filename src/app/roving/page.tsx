// app/roving/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card';

interface RovingItem {
  id: string;
  name: string;
  linear_density_tex: number;
  filament_count: number;
  compatible_resin: string;
  application: string;
  brands?: { name: string } | null;
  suppliers?: { name: string } | null;
}

export default async function RovingPage() {
  const { data, error } = await supabase
    .from('glass_fiber_roving')
    .select(`
      id,
      name,
      linear_density_tex,
      filament_count,
      compatible_resin,
      application,
      brands(name),
      suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }

  const rovings = data as unknown as RovingItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻璃纤维直接纱产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rovings?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p><span className="font-medium">线密度：</span>{item.linear_density_tex} tex</p>
              <p><span className="font-medium">单丝数：</span>{item.filament_count}</p>
              <p><span className="font-medium">适用树脂：</span>{item.compatible_resin}</p>
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
