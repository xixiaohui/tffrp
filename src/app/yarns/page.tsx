// app/yarns/page.tsx

import { supabase } from "@/lib/supabase";
import { MaterialList } from "@/components/MaterialList";
import { MaterialItem } from "@/components/MaterialList";

// Async page component for displaying a list of glass fiber yarns
export default async function GlassFiberYarnsPage() {
  // Fetch yarn data from the database with brand and supplier names
  const { data, error } = await supabase
    .from("tf_glass_fiber_yarns")
    .select(
      "id, type,name, linear_density_tex, filament_count, filament_diameter_um, twist_level, application, tf_brands(name), tf_suppliers(name)"
    );

  // Show error if data loading fails
  if (error) {
    return <div className="text-red-500 p-4">Failed to load: {error.message}</div>;
  } else {
    console.log("Supabase fetched data:", data);
  }

  // Define which fields to show in the list
  const fields = [
    { key: "linear_density_tex", label: "Linear Density (Tex)" },
    { key: "filament_count", label: "Filament Count (filaments/meter)" },
    { key: "filament_diameter_um", label: "Filament Diameter (μm)" },
    { key: "twist_level", label: "Twist Level" },
    { key: "application", label: "Application" },
  ];

  // Cast the raw data to a typed array
  const yarns = data as unknown as MaterialItem[];

  // Render the material list with provided data and structure
  return (
    <MaterialList
      title="Glass Fiber Yarns"
      items={yarns || []}
      fields={fields}
    />
  );
}
