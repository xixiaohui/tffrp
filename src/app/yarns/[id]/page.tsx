
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/Mdxdesign'


interface YarnsDetail {
  id: string;
  name: string;
  linear_density_tex: number;
  filament_count: number;
  filament_diameter_um: number;
  twist_level: number;
  application: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
}

export default function YarnDetailPageClient() {
  const params = useParams();
  const id = params.id;

  const [yarn, setYarn] = useState<YarnsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tf_glass_fiber_yarns")
        .select(
          `
          id,
          name,
          linear_density_tex, 
          filament_count, 
          filament_diameter_um, 
          twist_level,
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
        setYarn(data as unknown as YarnsDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!yarn) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{yarn.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">线密度：</span>{yarn.linear_density_tex} Tex</p>
        <p><span className="font-medium">捻度：</span>{yarn.filament_count}捻/米</p>
        <p><span className="font-medium">单丝直径：</span>{yarn.filament_diameter_um}μm</p>
        <p><span className="font-medium">捻度等级：</span>{yarn.twist_level}</p>
        <p><span className="font-medium">应用：</span>{yarn.application}</p>
        <p><span className="font-medium">品牌：</span>{yarn.tf_brands?.name || "—"}</p>
        <p><span className="font-medium">供应商：</span>{yarn.tf_suppliers?.name || "—"}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
