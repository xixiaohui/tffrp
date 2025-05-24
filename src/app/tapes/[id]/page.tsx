
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/Mdxdesign'

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
        setError('未找到数据');
        console.log('Supabase 查询数据:', data);
      } else {
        setTape(data as unknown as TapeDetail);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">加载失败: {error}</div>;
  if (!tape) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{tape.name}</h1>
      <div className="space-y-2 text-base">
            <p><span className="font-medium">厚度：</span>{tape.thickness_mm} mm</p>
            <p><span className="font-medium">宽度：</span>{tape.width_mm} mm</p>
            <p><span className="font-medium">胶类型：</span>{tape.adhesive_type || '—'}</p>
            <p><span className="font-medium">应用：</span>{tape.application}</p>
            <p><span className="font-medium">品牌：</span>{tape.tf_brands?.name || '—'}</p>
            <p><span className="font-medium">供应商：</span>{tape.tf_suppliers?.name || '—'}</p>
      </div>

      <MDXProvider components={components}>
        <Content />
      </MDXProvider>;
      
    </div>
  );
}
