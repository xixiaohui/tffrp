
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';


import { components } from '@/components/Mdxdesign'


interface ChoppedStrandsDetail {
    id: string;
    name: string;
    length_mm: number;
    diameter_um: number;
    compatibility: string;
    application: string;
    tf_brands?: { name: string } | null;
    tf_suppliers?: { name: string } | null;
}

export default function MatDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [choppedstrands, setChoppedStrands] = useState<ChoppedStrandsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_chopped_strands")
        .select(
          `
            id,
            name,
            length_mm,
            diameter_um,
            compatibility,
            application,
            tf_brands(name),
            tf_suppliers(name)
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        setError('未找到数据');
      } else {
        setChoppedStrands(data as unknown as ChoppedStrandsDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!choppedstrands) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{choppedstrands.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">长度：</span>{choppedstrands.length_mm} mm</p>
        <p><span className="font-medium">直径：</span>{choppedstrands.diameter_um} μm</p>
        <p><span className="font-medium">适配树脂：</span>{choppedstrands.compatibility}</p>
        <p><span className="font-medium">应用：</span>{choppedstrands.application}</p>
        <p><span className="font-medium">品牌：</span>{choppedstrands.tf_brands?.name || '—'}</p>
        <p><span className="font-medium">供应商：</span>{choppedstrands.tf_suppliers?.name || '—'}</p>
</div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
