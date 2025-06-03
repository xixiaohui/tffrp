import Link from 'next/link';


const categories = [
  { name: 'Glass Fiber Fabrics', href: '/fabrics' },
  { name: 'Glass Fiber Mesh', href: '/meshes' },
  { name: 'Glass Fiber Tapes', href: '/tapes' },
  { name: 'Glass Fiber Roving', href: '/roving' },
  { name: 'Glass Fiber Grids', href: '/grids' },
  { name: 'Glass Fiber Chopped Strand', href: '/chopped_strands' },
  { name: 'Glass Fiber Mats', href: '/mats' },
  { name: 'Glass Fiber Yarns', href: '/yarns' },
  { name: 'Glass Fiber Powders', href: '/powders' },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-4">

    
      
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <li key={cat.href}>
            <Link href={cat.href} className="block p-4 border rounded hover:bg-gray-100">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
