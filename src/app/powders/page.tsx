// app/powders/page.tsx
import { supabase } from "@/lib/supabase";
import { MaterialList , MaterialItem} from "@/components/MaterialList";


export default async function GlassFiberPowdersPage() {
  const { data, error } = await supabase
    .from("tf_glass_fiber_powders")
    .select("id, name, type, avg_particle_size_um, moisture_content_pct, whiteness_pct, application, tf_brands(name), tf_suppliers(name)");

  if (error) {
    return <div className="text-red-500 p-4">Failed to load: {error.message}</div>;
  } else {
    console.log('Supabase query data:', data);
  }

  const fields = [
    { key: "avg_particle_size_um", label: "Average Particle Size (μm)" },
    { key: "moisture_content_pct", label: "Moisture Content (%)" },
    { key: "whiteness_pct", label: "Whiteness (%)" },
    { key: "application", label: "Application" },
  ];

  const powders = data as unknown as MaterialItem[];

  return (
    <MaterialList
      title="Glass Fiber Powders"
      items={powders || []}
      fields={fields}
    />
  );
}
