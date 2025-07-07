export default function ContactPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-0 max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Get in Touch</h2>
        <form className="grid gap-6">
          <input type="text" placeholder="Name" className="border rounded-lg p-4" />
          <input type="email" placeholder="Email" className="border rounded-lg p-4" />
          <textarea placeholder="Message" rows="4" className="border rounded-lg p-4"></textarea>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-4">Send Message</button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          Or call us: <a href="tel:+97144589090" className="text-blue-600">+971 4 458 9090</a>
        </div>
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=..." 
            className="w-full h-64 rounded-lg shadow-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
