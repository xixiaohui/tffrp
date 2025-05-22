import Link from 'next/link';

const categories = [
  { name: '玻璃纤维布', href: '/fabrics' },
  { name: '玻璃纤维网格布', href: '/meshes' },
  { name: '玻璃纤维胶带', href: '/tapes' },
  { name: '玻璃纤维直接纱', href: '/roving' },
  { name: '玻璃纤维格栅', href: '/grids' },
  { name: '玻璃纤维短切原丝', href: '/chopped-strands' },
  { name: '玻璃纤维毡', href: '/mats' },
  { name: '玻璃纤维纱线', href: '/yarns' },
  { name: '玻璃纤维粉末', href: '/powders' },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">玻璃纤维原材料信息平台</h1>
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