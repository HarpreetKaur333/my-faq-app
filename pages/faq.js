// pages/faq.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const faqs = [
  { question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
  { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
  { question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.query.search) {
      setSearchTerm(router.query.search);
    }
  }, [router.query.search]);


  useEffect(() => {
    setFilteredFaqs(
      faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);


  const toggleFaq = (index) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const expandAll = () => {
    const newExpandedFaqs = {};
    filteredFaqs.forEach((_, index) => {
      newExpandedFaqs[index] = true;
    });
    setExpandedFaqs(newExpandedFaqs);
  };


  const collapseAll = () => {
    setExpandedFaqs({});
  };


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(`/faq?search=${encodeURIComponent(value)}`, undefined, { shallow: true });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8" style={{ maxWidth: '768px', margin: '0 auto', padding: '24px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginTop: '32px' }}>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#2D3748' }}>Frequently Asked Questions</h1>
      
      <div  className="mb-6" style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', outline: 'none', transition: 'border-color 0.3s' }}
        />
      </div>

      <div className="flex justify-end mb-4" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={expandAll}
          style={{ marginRight: '8px', padding: '8px 16px', backgroundColor: '#3182CE', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer', transition: 'background-color 0.3s' }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2B6CB0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3182CE')}
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          style={{ padding: '8px 16px', backgroundColor: '#718096', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer', transition: 'background-color 0.3s' }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#4A5568')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#718096')}
        >
          Collapse All
        </button>
      </div>

      <div className="divide-y divide-gray-200" style={{ borderTop: '1px solid #E2E8F0' }}>
        {filteredFaqs.map((faq, index) => (
          <div className="py-4" key={index} style={{ borderBottom: '1px solid #E2E8F0', paddingTop: '16px', paddingBottom: '16px' }}>
            <button
              onClick={() => toggleFaq(index)}
              style={{ width: '100%', textAlign: 'left', fontSize: '18px', fontWeight: '500', color: '#2D3748', padding: '12px', backgroundColor: '#F7FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.3s, color 0.3s', outline: 'none' }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#EDF2F7';
                e.target.style.color = '#1A202C';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#F7FAFC';
                e.target.style.color = '#2D3748';
              }}
            >
              {faq.question}
            </button>
            {expandedFaqs[index] && (
              <div className="mt-3 px-4 py-3 text-gray-600 bg-gray-50 border border-t-0 border-gray-300 rounded-b-md" style={{ marginTop: '12px', padding: '12px', backgroundColor: '#F7FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p lassName="text-center text-gray-500 mt-6" style={{ textAlign: 'center', color: '#A0AEC0', marginTop: '24px' }}>No Result Found as FAQs.</p>
        )}
      </div>
    </div>
  );
}
