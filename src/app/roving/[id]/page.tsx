
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/Mdxdesign'


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
        setError('未找到数据');
        console.log('Supabase 查询数据:', data);
      } else {
        setRoving(data as unknown as RovingDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!roving) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{roving.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">线密度：</span>{roving.tex} Tex</p>
        <p><span className="font-medium">类型：</span>{roving.mtype}</p>
        <p><span className="font-medium">适用树脂：</span>{roving.compatible_resin}</p>
        <p><span className="font-medium">应用：</span>{roving.application}</p>
        <p><span className="font-medium">品牌：</span>{roving.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">供应商：</span>{roving.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
