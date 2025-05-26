'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/Mdxdesign'

interface YarnsDetail {
  id: string;
  name: string;
  linear_density_tex: number;
  filament_count: number;
  filament_diameter_um: number;
  twist_level: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default function YarnDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [yarn, setYarn] = useState<YarnsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_yarns")
        .select(
          `
          id,
          name,
          linear_density_tex, 
          filament_count, 
          filament_diameter_um, 
          twist_level,
          application,
          tf_brands(name),
          tf_suppliers(name)
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        setError('Data not found');
      } else {
        setYarn(data as unknown as YarnsDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Failed to load: {error}</div>;
  if (!yarn) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{yarn.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">Linear Density:</span> {yarn.linear_density_tex} Tex</p>
        <p><span className="font-medium">Filament Count:</span> {yarn.filament_count} filaments/meter</p>
        <p><span className="font-medium">Filament Diameter:</span> {yarn.filament_diameter_um} μm</p>
        <p><span className="font-medium">Twist Level:</span> {yarn.twist_level}</p>
        <p><span className="font-medium">Application:</span> {yarn.application}</p>
        <p><span className="font-medium">Brand:</span> {yarn.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">Supplier:</span> {yarn.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    </div>
  );
}
