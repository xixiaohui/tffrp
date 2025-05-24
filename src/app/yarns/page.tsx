// CREATE TABLE tf_glass_fiber_yarns (
//   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   name text NOT NULL,
//   linear_density_tex numeric,
//   filament_count integer,
//   filament_diameter_um numeric,
//   twist_level text,
//   application text,
//   brand_id uuid REFERENCES tf_brands(id),
//   supplier_id uuid REFERENCES tf_suppliers(id),
//   created_at timestamp DEFAULT now(),
//   updated_at timestamp DEFAULT now()
// )

// INSERT INTO tf_glass_fiber_yarns (
//   name, linear_density_tex, filament_count, filament_diameter_um, twist_level, application, brand_id, supplier_id
// )
// VALUES
// ('Jushi E-Glass 33TEX', 33, 400, 9, '低捻', '织带', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('CPIC D450TEX HighStrength', 450, 1600, 13, '高捻', '工业增强', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('NEG Soft 110TEX', 110, 800, 11, '中捻', '电子织布', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('Taishan Yarn 33TEX', 33, 600, 9, '低捻', '带材', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('OC StrongTex 22TEX', 22, 400, 7, '高捻', '电绝缘布', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('CPIC MultiFil 900TEX', 900, 2400, 15, '低捻', '缠绕成型', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('NEG SmoothYarn 66TEX', 66, 500, 10, '中捻', '针织增强', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('Taishan GY 200TEX', 200, 1400, 12, '高捻', '过滤介质', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('Jushi Twisted 44TEX', 44, 480, 9, '中捻', '缠绕制品', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
// ('OC YarnMax 88TEX', 88, 900, 11, '低捻', '布带基材', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0');

// app/yarns/page.tsx
import { supabase } from "@/lib/supabase";
import { MaterialList } from "@/components/MaterialList";
import { MaterialItem } from "@/components/MaterialList";

export default async function GlassFiberPowdersPage() {
  const { data, error } = await supabase
    .from("tf_glass_fiber_yarns")
    .select(
      "id, name, linear_density_tex, filament_count, filament_diameter_um, twist_level, application, tf_brands(name), tf_suppliers(name)"
    );

  if (error) {
    return <div className="text-red-500 p-4">加载失败：{error.message}</div>;
  } else {
    console.log("Supabase 查询数据:", data);
  }

  const fields = [
    { key: "linear_density_tex", label: "线密度 (Tex)" },
    { key: "filament_count", label: "捻度 (捻/米)" },
    { key: "filament_diameter_um", label: "单丝直径 (μm)" },
    { key: "twist_level", label: "捻度等级" },
    { key: "application", label: "应用" },
  ];

  const yarns = data as unknown as MaterialItem[];

  return (
    <MaterialList
      title="玻璃纤维纱线"
      items={yarns || []}
      fields={fields}
      basePath="/yarns"
    />
  );
}
