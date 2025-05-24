
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';


import { components } from '@/components/Mdxdesign'


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
            width_mm,
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
        setGrid(data as unknown as GridDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!grid) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{grid.name}</h1>
      <div className="space-y-2 text-base">
        <p><span className="font-medium">克重：</span>{grid.weight_gsm} g/m²</p>
        <p><span className="font-medium">网格尺寸：</span>{grid.mesh_size_mm} mm</p>
        <p><span className="font-medium">抗拉强度：</span>{grid.tensile_strength_mpa} MPa</p>
        <p><span className="font-medium">应用：</span>{grid.application}</p>
        <p><span className="font-medium">品牌：</span>{grid.tf_brands?.name || '—'}</p>
        <p><span className="font-medium">供应商：</span>{grid.tf_suppliers?.name || '—'}</p>
    </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
