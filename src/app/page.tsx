// import Image from "next/image";
import HomeBanner from '@/components/HomeBanner';

// import { Search , BrickWallFire, PackageSearch , StoreIcon} from 'lucide-react'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <HomeBanner />
        {/* <Image
          className="dark:invert"
          src="/icon.png"
          alt="tffrp logo"
          width={80}
          height={80}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Fiberglass Raw Materials Distributor.
          </li>
          <li className="tracking-[-.01em]">
            One-stop supplier of composite materials.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/materials"
            
            rel="noopener noreferrer"
          >
            <Search />
            More Products
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/contact"
  
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </div> */}
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/all-materials"
        
          rel="noopener noreferrer"
        >
          <BrickWallFire />
          All Materials
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/products"
        
          rel="noopener noreferrer"
        >
          <PackageSearch />
          All Products
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        
          rel="noopener noreferrer"
        >
          <StoreIcon />
          About Us
        </a>
        
      </footer> */}
    </div>
  );
}
