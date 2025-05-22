// app/rovings/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card';


interface RovingItem {
    id: string;
    name: string;
    tex: number;
    type: string;
    application: string;
    compatible_resin: string;
    brands?: { name: string } | null;
    suppliers?: { name: string } | null;
  }

export default async function RovingPage() {

  const { data, error } = await supabase
    .from('rovings')
    .select(`
      id,
      name,
      tex,
      type,
      application,
      compatible_resin,
      brands(name),
      suppliers(name)
    `);

  if (error) {
    console.error('加载失败:', error.message);
    return <div className="p-4 text-red-500">加载失败，请稍后再试: {error.message}</div>;
  }else{
    console.log('Supabase 查询数据:', data);
  }

  const rovings = data as unknown as RovingItem[];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">无捻粗纱产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rovings?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p><span className="font-medium">Tex：</span>{item.tex}</p>
              <p><span className="font-medium">类型：</span>{item.type}</p>
              <p><span className="font-medium">应用：</span>{item.application}</p>
              <p><span className="font-medium">兼容树脂：</span>{item.compatible_resin}</p>
              <p><span className="font-medium">品牌：</span>{item.brands?.name || '—'}</p>
              <p><span className="font-medium">供应商：</span>{item.suppliers?.name || '—'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
