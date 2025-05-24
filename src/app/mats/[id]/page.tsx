
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';


import { components } from '@/components/Mdxdesign'


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
        setError('未找到数据');
      } else {
        setMat(data as unknown as MatDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!mat) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{mat.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">克重：</span>{mat.weight_gsm} g/m²</p>
        <p><span className="font-medium">厚度：</span>{mat.thickness_mm}%</p>
        <p><span className="font-medium">应用：</span>{mat.application}</p>
        <p><span className="font-medium">品牌：</span>{mat.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">供应商：</span>{mat.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
