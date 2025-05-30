'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/Mdxdesign'

import ContactCTA from '@/components/ContactCTA'

import { ImageCard } from '@/components/ImageCard'

interface TapeDetail {
    id: string;
    name: string;
    thickness_mm: number;
    width_mm: number;
    adhesive_type: string;
    application: string;
    tf_brands?: { name: string } | null;
    tf_suppliers?: { name: string } | null;
}

export default function TapeDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [tape, setTape] = useState<TapeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_tapes")
        .select(
          `
          id,
          name,
          thickness_mm, 
          width_mm, 
          adhesive_type, 
          application,
          tf_brands(name),
          tf_suppliers(name)
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        setError('Data not found');
        console.log('Supabase fetched data:', data);
      } else {
        setTape(data as unknown as TapeDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Failed to load: {error}</div>;
  if (!tape) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">

      <ImageCard
        src="/images/tape.jpg"
        alt="Fiber Glass Tape"
        title={tape.name}
        description=""
      />

      <div className="space-y-2 text-base bg-gray-50">
        <p><span className="font-medium">Thickness:</span> {tape.thickness_mm} mm</p>
        <p><span className="font-medium">Width:</span> {tape.width_mm} mm</p>
        <p><span className="font-medium">Adhesive Type:</span> {tape.adhesive_type || '—'}</p>
        <p><span className="font-medium">Application:</span> {tape.application}</p>
        <p><span className="font-medium">Brand:</span> {tape.tf_brands?.name || '—'}</p>
        <p><span className="font-medium">Supplier:</span> {tape.tf_suppliers?.name || '—'}</p>
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
