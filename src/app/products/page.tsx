// app/products/page.tsx
import { supabase } from '@/lib/supabase';
import { MaterialList } from '@/components/MaterialList';
import {MaterialItem} from "@/components/MaterialList";

export const dynamic = 'force-dynamic';

export default async function AllProductsPage() {
  // 所有查询并发进行，提高速度
  const [powders, yarns, mats, oxides] = await Promise.all([
    supabase.from('tf_glass_fiber_powders').select('id, name, application, tf_brands(name), tf_suppliers(name)'),
    supabase.from('tf_glass_fiber_yarns').select('id, name, application, tf_brands(name), tf_suppliers(name)'),
    supabase.from('tf_glass_fiber_mats').select('id, name, application, tf_brands(name), tf_suppliers(name)'),
    supabase.from('tf_glass_fiber_roving').select('id, name, application, tf_brands(name), tf_suppliers(name)'),
  ]);

  return (
    <div className="space-y-10 px-6 py-8 max-w-7xl mx-auto">
      <MaterialList
        title="Glass Fiber Powders"
        items={powders.data as unknown as MaterialItem[] || []}
        fields={[{ label: '应用', key: 'application' }]}
        basePath="/powders"
      />
      <MaterialList
        title="Glass Fiber Yarns"
        items={yarns.data as unknown as MaterialItem[] || []}
        fields={[{ label: '应用', key: 'application' }]}
        basePath="/yarns"
      />
      <MaterialList
        title="Glass Fiber Mats"
        items={mats.data as unknown as MaterialItem[] || []}
        fields={[{ label: '应用', key: 'application' }]}
        basePath="/mats"
      />
      <MaterialList
        title="Glass Fiber Roving"
        items={oxides.data as unknown as MaterialItem[] || []}
        fields={[{ label: '应用', key: 'application' }]}
        basePath="/roving"
      />
    </div>
  );
}
