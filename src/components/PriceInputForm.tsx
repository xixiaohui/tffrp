'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card"
import {
  Button
} from "@/components/ui/button"
import {
  Input
} from "@/components/ui/input"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"
import {
  Label
} from "@/components/ui/label"

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

export default function PriceInputForm() {


  const [selectedType, setSelectedType] = useState(TABLE_OPTIONS[0])
  const [products, setProducts] = useState<{ id: string, name: string }[]>([])
  const [productId, setProductId] = useState<string | null>(null)
  const [recordDate, setRecordDate] = useState<string>("")
  const [priceUSD, setPriceUSD] = useState<string>("")
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from(selectedType.productTable)
        .select("id, name")
        .order("name")

      if (!error && data) {
        setProducts(data)
        setProductId(data[0]?.id ?? null)
      }
    }

    fetchProducts()
  }, [selectedType])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!productId || !recordDate || !priceUSD) return

    const { error } = await supabase
      .from(selectedType.priceTable)
      .insert([
        {
          product_id: productId,
          record_date: recordDate,
          price_usd: parseFloat(priceUSD),
        },
      ])

    if (!error) {
      setSuccessMsg("✅ Price record added successfully!")
      setPriceUSD("")
    } else {
      setSuccessMsg("❌ Failed to insert. Check console.")
      console.error(error)
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>📈 Add Price Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 产品分类 */}
          <div>
            <Label>Product Type</Label>
            <Select
              value={selectedType.label}
              onValueChange={(value) => {
                const found = TABLE_OPTIONS.find(t => t.label === value)
                if (found) setSelectedType(found)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {TABLE_OPTIONS.map((type) => (
                  <SelectItem key={type.label} value={type.label}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 产品 */}
          <div>
            <Label>Product</Label>
            <Select value={productId ?? ""} onValueChange={setProductId}>
              <SelectTrigger>
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

          {/* 日期 */}
          <div>
            <Label>Record Date</Label>
            <Input
              type="date"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
              required
            />
          </div>

          {/* 价格 */}
          <div>
            <Label>Price (USD)</Label>
            <Input
              type="number"
              step="0.01"
              value={priceUSD}
              onChange={(e) => setPriceUSD(e.target.value)}
              required
            />
          </div>

          {/* 提交按钮 */}
          <Button type="submit">Submit</Button>

          {successMsg && (
            <p className="text-sm text-green-600 mt-2">{successMsg}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
