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
  brand?: string | null;
  supplier?: string | null;
  type? : string | null;
  [key: string]: any;
}

interface Props {
  title: string;
  items: MaterialItem[];
  fields: { label: string; key: string }[];
}

export function MaterialList({ title, items, fields }: Props) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const brand = item.brand ?? item.tf_brands?.name ?? "—";
          const supplier = item.supplier ?? item.tf_suppliers?.name ?? "—";
          
          const basePath = item.type ? `/${item.type.toLowerCase()}` : "/materials";
          const detailUrl = `${basePath}/${item.id}`;

          return (
            <Link key={item.id} href={detailUrl}>
              <Card>
                <CardContent className="p-4 space-y-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  {fields.map(({ label, key }) => (
                    <p key={key}>
                      <span className="font-medium">{label}：</span>
                      {item[key] || "—"}
                    </p>
                  ))}
                  <p>
                    <span className="font-medium">Brand：</span>
                    {brand}
                  </p>
                  <p>
                    <span className="font-medium">Supplier：</span>
                    {supplier}
                  </p>

                  <button className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    more info
                  </button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
