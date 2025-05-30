import Image from "next/image"

export default function WhatsAppQRCode() {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Scan to Contact Us on WhatsApp!</h2>
      <div className="w-48 h-48 relative mb-4">
        <Image
          src="/images/whatsapp_qr.png"
          alt="WhatsApp QR Code"
          fill
          className="rounded-lg object-cover border border-gray-300"
        />
      </div>
      <p className="text-gray-600 text-center">
        Open your WhatsApp app, tap on &quot;Scan QR Code&quot; and connect with us instantly!
      </p>
    </div>
  )
}
