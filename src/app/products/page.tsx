// app/products/page.tsx
import { supabase } from '@/lib/supabase';
import { MaterialList } from '@/components/MaterialList';
import {MaterialItem} from "@/components/MaterialList";

export const dynamic = 'force-dynamic';

export default async function AllProductsPage() {
  // 所有查询并发进行，提高速度
  const [powders, yarns, mats, oxides,chopped_strands,fabrics,grids,meshes,tapes] = await Promise.all([
    supabase.from('tf_glass_fiber_powders').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_yarns').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_mats').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_roving').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_chopped_strands').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_fabrics').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_grids').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_meshes').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
    supabase.from('tf_glass_fiber_tapes').select('id, name, application, tf_brands(name), tf_suppliers(name),type'),
  ]);

  return (
    <div className="space-y-10 px-6 py-8 max-w-7xl mx-auto">
      <MaterialList
        title="1. Glass Fiber Powders"
        items={powders.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="2. Glass Fiber Yarns"
        items={yarns.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="3. Glass Fiber Mats"
        items={mats.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="4. Glass Fiber Roving"
        items={oxides.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="5. Glass Fiber Chopped Strands"
        items={chopped_strands.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="6. Glass Fiber Fabrics"
        items={fabrics.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}
  
      />
      <MaterialList
        title="7. Glass Fiber Grids"
        items={grids.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="8. Glass Fiber Meshes"
        items={meshes.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
      <MaterialList
        title="9. Glass Fiber Tapes"
        items={tapes.data as unknown as MaterialItem[] || []}
        fields={[{ label: 'Application', key: 'application' }]}

      />
    </div>
  );
}
