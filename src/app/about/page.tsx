// app/about/page.tsx
import { Building, Globe, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          We are a trusted distributor of fiberglass raw materials, committed to providing high-quality products to manufacturers around the world. With decades of experience and a global network of suppliers, we ensure fast, reliable, and efficient material delivery to our clients in a wide range of industries.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Integrity in every transaction</li>
          <li>Reliable global partnerships</li>
          <li>Commitment to quality and sustainability</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-xl text-center">
            <Globe className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Global Reach</h3>
            <p className="text-gray-500 text-sm">Sourcing and shipping fiberglass materials worldwide with optimized logistics.</p>
          </div>
          <div className="p-4 border rounded-xl text-center">
            <ShieldCheck className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-semibold text-lg">Quality Assurance</h3>
            <p className="text-gray-500 text-sm">We work only with certified suppliers to ensure consistent and compliant materials.</p>
          </div>
          <div className="p-4 border rounded-xl text-center">
            <Building className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
            <h3 className="font-semibold text-lg">Industry Expertise</h3>
            <p className="text-gray-500 text-sm">Years of experience serving composite, construction, and industrial clients.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
        <p className="text-gray-600">
          Want to know more about our materials or services?{' '}
          <a href="/contact" className="text-blue-600 underline">Reach out to our team</a> for personalized assistance.
        </p>
      </section>
    </main>
  )
}
