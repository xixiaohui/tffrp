'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';

import { components } from '@/components/Mdxdesign'

interface MeshDetail {
    id: string;
    name: string;
    weight_gsm: number;
    mesh_size_mm: string;
    treatment: string;
    application: string;
    tf_brands?: { name: string } | null;
    tf_suppliers?: { name: string } | null;
}

export default function MeshDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [mesh, setMesh] = useState<MeshDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_meshes")
        .select(
          `
            id,
            name,
            weight_gsm,
            mesh_size_mm,
            treatment,
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
        setMesh(data as unknown as MeshDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Loading failed: {error}</div>;
  if (!mesh) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{mesh.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">Weight:</span> {mesh.weight_gsm} g/m²</p>
        <p><span className="font-medium">Mesh Size:</span> {mesh.mesh_size_mm}</p>
        <p><span className="font-medium">Surface Treatment:</span> {mesh.treatment}</p>
        <p><span className="font-medium">Application:</span> {mesh.application}</p>
        <p><span className="font-medium">Brand:</span> {mesh.tf_brands?.name || '—'}</p>
        <p><span className="font-medium">Supplier:</span> {mesh.tf_suppliers?.name || '—'}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
      
    </div>
  );
}
