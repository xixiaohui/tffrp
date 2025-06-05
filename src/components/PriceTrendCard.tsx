'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

/**
 * 单表版本
 */
type Product = {
  id: string
  name: string
}

type PriceRecord = {
  record_date: string
  price_usd: number
}

export default function PriceTrendCard() {

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [priceData, setPriceData] = useState<PriceRecord[]>([])

  // 获取所有产品列表（假设 chopped strands 表中有 name 字段）
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_chopped_strands")
        .select("id, name")
        .order("name", { ascending: true })
      if (!error && data) {
        setProducts(data)
        setSelectedProductId(data[0]?.id ?? null)
      }
    }
    fetchProducts()
  }, [])

  // 获取某个产品的价格数据
  useEffect(() => {
    if (!selectedProductId) return

    async function fetchPriceData() {
      const { data, error } = await supabase
        .from("chopped_strands_prices")
        .select("record_date, price_usd")
        .eq("product_id", selectedProductId)
        .order("record_date", { ascending: true })

      if (!error && data) {
        setPriceData(data)
      }
    }

    fetchPriceData()
  }, [selectedProductId])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle className="text-xl font-semibold">Annual Price Trend</CardTitle>
        <Select value={selectedProductId ?? undefined} onValueChange={setSelectedProductId}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="record_date" />
            <YAxis unit="$" />
            <Tooltip />
            <Line type="monotone" dataKey="price_usd" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
