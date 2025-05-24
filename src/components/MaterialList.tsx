/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export interface MaterialItem {
  id: string;
  name: string;
  application?: string;
  tf_brands?: { name: string } | null;
  tf_suppliers?: { name: string } | null;
  [key: string]: any;
}

interface Props {
  title: string;
  items: MaterialItem[];
  fields: { label: string; key: string }[];
  basePath: string;
}

export function MaterialList({ title, items, fields, basePath }: Props) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link key={item.id} href={`${basePath}/${item.id}`}>
            <Card key={item.id}>
              <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                {fields.map(({ label, key }) => (
                  <p key={key}>
                    <span className="font-medium">{label}：</span>
                    {item[key] || "—"}
                  </p>
                ))}
                <p>
                  <span className="font-medium">品牌：</span>
                  {item.tf_brands?.name || "—"}
                </p>
                <p>
                  <span className="font-medium">供应商：</span>
                  {item.tf_suppliers?.name || "—"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
