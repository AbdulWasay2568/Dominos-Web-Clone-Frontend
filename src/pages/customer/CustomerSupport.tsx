import { useState } from 'react';

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Go to the Order Tracking screen from your profile or order history to view real-time updates.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'You can pay using Cash, Credit/Debit Cards, or Easypaisa/JazzCash.',
  },
  {
    question: 'Can I cancel or change my order?',
    answer: 'Orders can be modified or canceled within 5 minutes of placing them.',
  },
];

const CustomerSupport = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Support & Help</h2>

      {/* FAQs */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer transition hover:shadow-md bg-white"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">{faq.question}</h4>
                <span className="text-xl text-gray-500">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              placeholder="Describe your issue..."
              className="w-full border rounded-lg p-3 h-32 resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default CustomerSupport;
