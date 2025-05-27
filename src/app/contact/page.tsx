// app/contact/page.tsx
'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: send data to backend (e.g., Supabase or email service)
    alert('Message sent!')
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have questions about fiberglass materials, pricing, or logistics? Our team is here to help.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Phone</h4>
              <p className="text-gray-600">+86 136 9677 1864</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Email</h4>
              <p className="text-gray-600">sales@tfcomposite.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p className="text-gray-600">Room 1716, Building C, Greenland Blue Sea, Qianshan Road, Hefei, Anhui Province, China</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-xl px-6 py-2 hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Optional Google Map */}
      {/* <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="300"
          className="rounded-xl border"
          loading="lazy"
        ></iframe>
      </section> */}
    </main>
  )
}
