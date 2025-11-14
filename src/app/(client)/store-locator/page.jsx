"use client";

export default function StoreLocator() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 font-[var(--font-inter)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="pt-10">
          <h2 className="text-3xl font-bold mb-6">Find Us at:</h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            Kutchery Road,<br />
            Mohni Bazar, Nawabshah<br />
            67450
          </p>
        </div>

        {/* RIGHT SIDE — REAL GOOGLE MAP */}
        <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl border">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d408.5923877817728!2d68.40749756885185!3d26.2472051034159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1763131597048!5m2!1sen!2s"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
