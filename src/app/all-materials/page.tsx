"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MaterialList, MaterialItem } from "@/components/MaterialList";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [filtered, setFiltered] = useState<MaterialItem[]>([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc("get_all_materials");
      if (!error && data) {
        setMaterials(data);
        setFiltered(data);

        console.log("supabase :",data)
      } else {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = materials.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesBrand = brand ? item.brand === brand : true;
      const matchesSupplier = supplier
        ? item.supplier === supplier
        : true;
      return matchesSearch && matchesBrand && matchesSupplier;
    });
    setFiltered(filtered);

  
  }, [search, brand, supplier, materials]);

  const allBrands = Array.from(
    new Set(materials.map((m) => m.brand).filter(Boolean))
  ) as string[];
  const allSuppliers = Array.from(
    new Set(materials.map((m) => m.supplier).filter(Boolean))
  ) as string[];

  

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Materials</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={brand || "__all__"}
          onValueChange={(val) => setBrand(val === "__all__" ? "" : val)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Brands</SelectItem>
            {allBrands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={supplier || "__all__"}
          onValueChange={(val) => setSupplier(val === "__all__" ? "" : val)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Supplier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Suppliers</SelectItem>
            {allSuppliers.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MaterialList
        title="Materials"
        items={filtered}
        fields={[
          { label: "Application", key: "application" },
          { label: "Type", key: "type" },
        ]}
      />
    </div>
  );
}
