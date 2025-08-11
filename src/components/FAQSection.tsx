// src/components/FAQSection.tsx
import React from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = "Top GBA Game FAQs",
  description = "Explore critically acclaimed classics on Game Boy Advance",
  ctaText = "Browse Full GBA Library",
  ctaLink = "/gba-games"
}) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 my-16 shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {faqs.map((faq) => (
          <FAQItem 
            key={faq.id}
            index={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <a 
          href={ctaLink} 
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all shadow-md"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ index, question, answer }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
    <h3 className="text-xl font-bold text-blue-600 flex items-center">
      <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
        {index}
      </span>
      {question}
    </h3>
    <p className="mt-4 text-gray-700 pl-11">
      {answer}
    </p>
  </div>
);

export default FAQSection;
