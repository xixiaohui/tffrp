"use client";

import Link from "next/link";
import WhatsAppQRCode from "@/components/WhatsAppQRCode";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-10 border-t mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Product Catalog */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product Catalog</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/chopped_strands" className="hover:underline">
                Fiber Glass Chopped Strands
              </Link>
            </li>
            <li>
              <Link href="/fabrics" className="hover:underline">
                Fiberglass Fabric
              </Link>
            </li>
            <li>
              <Link href="/grids" className="hover:underline">
                Fiber Glass Grids
              </Link>
            </li>
            <li>
              <Link href="/mats" className="hover:underline">
                Fiber Glass Mats
              </Link>
            </li>
            <li>
              <Link href="/meshes" className="hover:underline">
                Fiber Glass Mesh
              </Link>
            </li>
            <li>
              <Link href="/powders" className="hover:underline">
                Fiber Glass Powder
              </Link>
            </li>
            <li>
              <Link href="/roving" className="hover:underline">
                Fiber Glass Roving
              </Link>
            </li>
            <li>
              <Link href="/tapes" className="hover:underline">
                Fiber Glass Tape
              </Link>
            </li>
            <li>
              <Link href="/yarns" className="hover:underline">
                Fiber Glass Yarn
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            We are a platform dedicated to organizing and sharing information on
            fiberglass raw materials, serving professionals in composites,
            procurement, and R&D.
          </p>
          <div className="mt-4">
            <SocialLinks
              links={[
                {
                  platform: "linkedin",
                  url: "https://www.linkedin.com/company/anhui-tianfu-new-material/",
                },
                { platform: "twitter", url: "https://x.com/HuangChauncy" },
                {
                  platform: "facebook",
                  url: "https://www.facebook.com/profile.php?id=61563429747228",
                },
                {
                  platform: "youtube",
                  url: "https://www.youtube.com/@tfcomposite2024",
                },
              ]}
              size={28}
            />
          </div>
          
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: sales@tfcomposite.com</p>
          <p className="text-sm">
            Address: Room 1716, Building C, Greenland Blue Sea, Qianshan Road,
            Hefei, Anhui Province, China
          </p>
          <div className="max-w-md mx-auto mt-10 hidden md:block">
            <WhatsAppQRCode />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © 2025 Fiberglass Raw Materials Info Platform – All rights reserved.
      </div>
    </footer>
  );
}
