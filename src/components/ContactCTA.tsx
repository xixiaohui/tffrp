// components/ContactCTA.tsx
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ContactCTA() {
  return (
    <div className="mt-16 rounded-2xl bg-blue-50 p-6 md:p-10 text-center shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Still have questions about this product?
      </h3>
      <p className="text-gray-600 mb-4">
        Let our sales team help you with pricing, availability, or technical details.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        <Mail className="w-5 h-5" />
        Contact Us
      </Link>
    </div>
  )
}
