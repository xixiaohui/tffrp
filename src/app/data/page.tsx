// app/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'

export default async function HomePage() {
  const { data: materials, error } = await supabase
    .from('materials')
    .select('id, name, type, density, supplier:suppliers(name)')

  if (error) return <p className="text-red-500">加载失败: {error.message}</p>

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">玻璃纤维原材料</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials?.map((m) => (
          <Card key={m.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{m.name}</h2>
              <p>类型：{m.type}</p>
              <p>密度：{m.density}</p>
              <p>供应商：{m.supplier?.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
