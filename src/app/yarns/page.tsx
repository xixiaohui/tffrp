// app/yarns/page.tsx
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'

interface Brand {
  name: string
  country: string
}

interface Supplier {
  name: string
}

interface YarnProduct {
  id: string
  name: string
  type: string
  tex: number
  twist: string
  brands: Brand
  suppliers: Supplier
}

export default async function YarnPage() {
  const { data ,error} = await supabase
    .from('yarn_products')
    .select('id, name, type, tex, twist, brands(name, country), suppliers(name)')

    
  if (error) {
    return <p className="text-red-500">加载失败: {error.message}</p>
  }else{
    console.log('Supabase 查询数据:', data);
  }
  
  const yarns = data as unknown as YarnProduct[]

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">玻纤纱线产品</h1>
      <div className="grid gap-4">
        {yarns.map((yarn) => (
          <Card key={yarn.id}>
            <CardContent className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{yarn.name}</h2>
              <p>类型：{yarn.type}</p>
              <p>线密度（Tex）：{yarn.tex}</p>
              <p>捻度：{yarn.twist}</p>
              <p>品牌：{yarn.brands.name}（{yarn.brands.country}）</p>
              <p>供应商：{yarn.suppliers.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
