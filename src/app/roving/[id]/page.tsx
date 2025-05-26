'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/Mdxdesign';

interface RovingDetail {
  id: string;
  name: string;
  tex: number;
  mtype: string;
  compatible_resin: string;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default function RovingDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [roving, setRoving] = useState<RovingDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_roving")
        .select(
          `
          id,
          name,
          tex, 
          mtype, 
          compatible_resin, 
          application,
          tf_brands(name),
          tf_suppliers(name)
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        setError('Data not found');
        console.log('Supabase query result:', data);
      } else {
        setRoving(data as unknown as RovingDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Failed to load: {error}</div>;
  if (!roving) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{roving.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">Linear Density:</span> {roving.tex} Tex</p>
        <p><span className="font-medium">Type:</span> {roving.mtype}</p>
        <p><span className="font-medium">Compatible Resin:</span> {roving.compatible_resin}</p>
        <p><span className="font-medium">Application:</span> {roving.application}</p>
        <p><span className="font-medium">Brand:</span> {roving.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">Supplier:</span> {roving.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    </div>
  );
}
