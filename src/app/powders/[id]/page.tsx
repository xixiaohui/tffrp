
'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams } from 'next/navigation';
import Content from './content.mdx';

import { MDXProvider } from '@mdx-js/react';


const components = {
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold text-indigo-700 mt-6 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-semibold text-indigo-600 mt-5 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl font-medium text-indigo-500 mt-4 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="text-base text-gray-800 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside ml-6 mb-4" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside ml-6 mb-4" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="mb-1" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-pink-600" {...props} />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm" {...props} />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <table className="table-auto border-collapse w-full my-4 text-sm" {...props} />
  ),
  thead: (props: React.ComponentProps<'thead'>) => (
    <thead className="bg-gray-100" {...props} />
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th className="border px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="border px-3 py-2" {...props} />
  ),
  hr: (props: React.ComponentProps<'hr'>) => (
    <hr className="my-6 border-gray-300" {...props} />
  ),
};


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
