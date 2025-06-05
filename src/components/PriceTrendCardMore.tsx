'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

/**
 * 多表版本
 */

const TABLE_OPTIONS = [
  {
    label: "Chopped Strands",
    productTable: "tf_glass_fiber_chopped_strands",
    priceTable: "chopped_strands_prices",
  },
  {
    label: "Fabrics",
    productTable: "tf_glass_fiber_fabrics",
    priceTable: "fabrics_prices",
  },
  
]

type Product = {
  id: string
  name: string
}

type PriceRecord = {
  record_date: string
  price_usd: number
}

export default function PriceTrendCard() {

  const [productTable, setProductTable] = useState(TABLE_OPTIONS[0])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [priceData, setPriceData] = useState<PriceRecord[]>([])

  // 加载产品列表
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from(productTable.productTable)
        .select("id, name")
        .order("name")

      if (!error && data) {
        setProducts(data)
        setSelectedProductId(data[0]?.id ?? null)
      } else {
        setProducts([])
        setSelectedProductId(null)
      }
    }

    fetchProducts()
  }, [productTable])

  // 加载价格数据
  useEffect(() => {
    if (!selectedProductId) return

    async function fetchPrices() {
      const { data, error } = await supabase
        .from(productTable.priceTable)
        .select("record_date, price_usd")
        .eq("product_id", selectedProductId)
        .order("record_date", { ascending: true })

      if (!error && data) {
        setPriceData(data)
      } else {
        setPriceData([])
      }
    }

    fetchPrices()
  }, [selectedProductId, productTable])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:items-center">
          <CardTitle className="text-xl font-semibold">Annual Price Trend</CardTitle>

          {/* 表类型选择 */}
          <Select
            value={productTable.label}
            onValueChange={(value) => {
              const found = TABLE_OPTIONS.find(t => t.label === value)
              if (found) setProductTable(found)
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Product Type" />
            </SelectTrigger>
            <SelectContent>
              {TABLE_OPTIONS.map(t => (
                <SelectItem key={t.label} value={t.label}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 产品选择 */}
          <Select
            value={selectedProductId ?? undefined}
            onValueChange={setSelectedProductId}
            disabled={products.length === 0}
          >
            <SelectTrigger className="w-[240px]">
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
        </div>
      </CardHeader>

      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="record_date" />
            <YAxis unit="$" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price_usd"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
