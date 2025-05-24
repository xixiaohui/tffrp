

// CREATE TABLE tf_glass_fiber_powders (
//     id UUID PRIMARY KEY,
//     name TEXT,
//     avg_particle_size_um NUMERIC,
//     moisture_content_pct NUMERIC,
//     whiteness_pct NUMERIC,
//     application TEXT,
//     brand_id UUID REFERENCES tf_brands(id),
//     supplier_id UUID REFERENCES tf_suppliers(id)
//   );
  
// app/powders/page.tsx
import { supabase } from "@/lib/supabase";
import { MaterialList } from "@/components/MaterialList";
import {MaterialItem} from "@/components/MaterialList";


export default async function GlassFiberPowdersPage() {
  const { data, error } = await supabase
    .from("tf_glass_fiber_powders")
    .select("id, name, type,avg_particle_size_um, moisture_content_pct, whiteness_pct, application, tf_brands(name), tf_suppliers(name)");

  if (error) {
    return <div className="text-red-500 p-4">加载失败：{error.message}</div>;
  }else{
    console.log('Supabase 查询数据:', data);
  }

  const fields = [
    { key: "avg_particle_size_um", label: "平均粒径 (μm)" },
    { key: "moisture_content_pct", label: "含水率 (%)" },
    { key: "whiteness_pct", label: "白度 (%)" },
    { key: "application", label: "应用" },
  ];

  const powders = data as unknown as MaterialItem[]

 
  return (
    <MaterialList
      title="玻璃纤维粉末"
      items={powders || []}
      fields={fields}
    />
  );
}
