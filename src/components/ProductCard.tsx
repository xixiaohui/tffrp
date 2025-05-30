// components/ProductCard.tsx
// import Image from 'next/image'
import { MaterialItem } from "@/components/MaterialList";

export default function ProductCard({ product }:{product: MaterialItem}) {
  return (
    <div className="group relative rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div> */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.tf_brands?.name || '-'} · {product.tf_suppliers?.name || '-'}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{product.application}</p>

        
        <button className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
          more info
        </button>
      </div>
    </div>
  )
}
