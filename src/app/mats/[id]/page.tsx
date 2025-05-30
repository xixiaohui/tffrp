'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';

import { components } from '@/components/Mdxdesign'

import ContactCTA from '@/components/ContactCTA'

import { ImageCard } from '@/components/ImageCard'

interface MatDetail {
  id: string;
  name: string;
  weight_gsm: number;
  thickness_mm: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default function MatDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [mat, setMat] = useState<MatDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_mats")
        .select(
          `
          id,
          name,
          weight_gsm,
          thickness_mm,
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
        setMat(data as unknown as MatDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Loading failed: {error}</div>;
  if (!mat) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <ImageCard
        src="/images/mat.jpg"
        alt="Chopped strand mat "
        title={mat.name}
        description=""
      />
      
      <div className="space-y-2 text-base bg-gray-50">
        <p><span className="font-medium">Weight:</span> {mat.weight_gsm} g/m²</p>
        <p><span className="font-medium">Thickness:</span> {mat.thickness_mm} mm</p>
        <p><span className="font-medium">Application:</span> {mat.application}</p>
        <p><span className="font-medium">Brand:</span> {mat.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">Supplier:</span> {mat.tf_suppliers?.name || "—"}</p>
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
