'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';

import { components } from '@/components/Mdxdesign'

import ContactCTA from '@/components/ContactCTA'
import { ImageCard } from '@/components/ImageCard'

interface GridDetail {
  id: string;
  name: string;
  weight_gsm: number;
  mesh_size_mm: string;
  tensile_strength_mpa: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default function GridDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [grid, setGrid] = useState<GridDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_grids")
        .select(
          `
            id,
            name,
            mesh_size_mm,
            weight_gsm,
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
        setGrid(data as unknown as GridDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Loading failed: {error}</div>;
  if (!grid) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <ImageCard
        src="/images/grid.jpg"
        alt="Fiber Glass Grid"
        title={grid.name}
        description=""
      />

      <div className="space-y-2 text-base bg-gray-50">
        <p><span className="font-medium">Weight:</span> {grid.weight_gsm} g/m²</p>
        <p><span className="font-medium">Mesh Size:</span> {grid.mesh_size_mm} mm</p>
        <p><span className="font-medium">Tensile Strength:</span> {grid.tensile_strength_mpa} MPa</p>
        <p><span className="font-medium">Application:</span> {grid.application}</p>
        <p><span className="font-medium">Brand:</span> {grid.tf_brands?.name || '—'}</p>
        <p><span className="font-medium">Supplier:</span> {grid.tf_suppliers?.name || '—'}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>

      <div>
        <ContactCTA />
      </div>
      
    </div>
  );
}
