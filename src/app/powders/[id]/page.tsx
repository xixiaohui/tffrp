'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';

import { components } from '@/components/Mdxdesign'

interface PowderDetail {
  id: string;
  name: string;
  avg_particle_size_um: number;
  moisture_content_pct: number;
  whiteness_pct: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default function PowderDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [powder, setPowder] = useState<PowderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_powders")
        .select(
          `
          id,
          name,
          avg_particle_size_um,
          moisture_content_pct,
          whiteness_pct,
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
        setPowder(data as unknown as PowderDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Loading failed: {error}</div>;
  if (!powder) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{powder.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">Average Particle Size:</span> {powder.avg_particle_size_um} μm</p>
        <p><span className="font-medium">Moisture Content:</span> {powder.moisture_content_pct}%</p>
        <p><span className="font-medium">Whiteness:</span> {powder.whiteness_pct}%</p>
        <p><span className="font-medium">Application:</span> {powder.application}</p>
        <p><span className="font-medium">Brand:</span> {powder.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">Supplier:</span> {powder.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
      
    </div>
  );
}
