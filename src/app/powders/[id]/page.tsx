
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
        setError('未找到数据');
      } else {
        setPowder(data as unknown as PowderDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!powder) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{powder.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">平均粒径：</span>{powder.avg_particle_size_um} μm</p>
        <p><span className="font-medium">含水率：</span>{powder.moisture_content_pct}%</p>
        <p><span className="font-medium">白度：</span>{powder.whiteness_pct}%</p>
        <p><span className="font-medium">应用：</span>{powder.application}</p>
        <p><span className="font-medium">品牌：</span>{powder.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">供应商：</span>{powder.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
