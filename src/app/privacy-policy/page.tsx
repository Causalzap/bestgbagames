// src/app/privacy-policy/page.tsx
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Privacy Policy - Game Boy Advance Archive",
  description: "Learn how we handle your personal information"
});

export default function PrivacyPolicy() {
  return (
    <div className="crt min-h-screen p-4" style={{ backgroundColor: '#181818', color: '#e0e0e0' }}>
      <div className="container mx-auto px-4 max-w-3xl py-10">
        {/* 标题区域 - 复古风格设计 */}
        <div className="border-2 border-yellow-600 p-6 mb-10 rounded-lg" 
             style={{ background: 'linear-gradient(to bottom, #3a3a3a, #1a1a1a)', boxShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
          <h1 className="text-3xl font-bold text-center mb-4 text-yellow-400 tracking-wide">
            <span className="inline-block transform -rotate-2">P</span>
            <span className="inline-block transform rotate-1">r</span>
            <span className="inline-block transform -rotate-3">i</span>
            <span className="inline-block transform rotate-2">v</span>
            <span className="inline-block transform -rotate-1">a</span>
            <span className="inline-block transform rotate-3">c</span>
            <span className="inline-block transform -rotate-2">y</span>
            <span className="ml-3 inline-block transform rotate-1">P</span>
            <span className="inline-block transform -rotate-3">o</span>
            <span className="inline-block transform rotate-2">l</span>
            <span className="inline-block transform -rotate-1">i</span>
            <span className="inline-block transform rotate-3">c</span>
            <span className="inline-block transform -rotate-2">y</span>
          </h1>
          <p className="text-center text-yellow-500 text-sm tracking-wide">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        
        {/* 内容区域 - 提高可读性 */}
        <div className="privacy-content" style={{ lineHeight: '1.8' }}>
          <div className="mb-10 pb-6 border-b border-gray-700">
            <p className="mb-6 leading-relaxed">
              This Privacy Policy explains how 
              <span className="font-bold text-yellow-400"> Game Boy Advance Archive</span> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              collects, uses, and discloses your personal information when you use our website
              <span className="font-mono text-green-400 bg-black px-2 py-1 rounded ml-1">gbarchive.com</span>
              (the &quot;Site&quot;).
            </p>
            
            <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-yellow-600 mb-8">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">
                <span className="mr-2">1.</span> Information We Collect
              </h2>
              <p className="mb-4">We collect the following types of information:</p>
              
              <ul className="list-none space-y-4">
                <li className="flex items-start">
                  <span className="bg-yellow-600 text-black font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0">A</span>
                  <div>
                    <span className="font-semibold text-green-300">Basic Usage Data:</span> When you visit our site, we automatically collect:
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                      <li>Your IP address</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-600 text-black font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0">B</span>
                  <div>
                    <span className="font-semibold text-green-300">Email Addresses:</span> Only if you voluntarily provide them through contact forms or newsletter signups.
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-purple-600 mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-400">
              <span className="mr-2">2.</span> Use of Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <li className="flex items-start">
                <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>To provide and maintain our service</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>To analyze site usage for improvement</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>To respond to your inquiries</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>To send periodic emails (only if you opt-in)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-red-600 mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">
              <span className="mr-2">3.</span> Tracking Technologies
            </h2>
            <p className="mb-4">We use Google Analytics to analyze site traffic. We do not use cookies for:</p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-3 py-1 rounded-full bg-gray-800 border border-red-500 text-red-300">Personalized advertising</span>
              <span className="px-3 py-1 rounded-full bg-gray-800 border border-red-500 text-red-300">Cross-site tracking</span>
              <span className="px-3 py-1 rounded-full bg-gray-800 border border-red-500 text-red-300">Sensitive data collection</span>
            </div>
          </div>
          
          <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-green-600 mb-8">
            <h2 className="text-xl font-bold mb-4 text-green-400">
              <span className="mr-2">4.</span> Your Data Rights
            </h2>
            <p>You have the right to:</p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="font-bold text-green-300 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access personal data
                </div>
                <p className="text-sm text-gray-300">Request to see what data we hold about you</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="font-bold text-green-300 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Correct inaccurate data
                </div>
                <p className="text-sm text-gray-300">Request updates to incorrect information</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="font-bold text-green-300 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete your data
                </div>
                <p className="text-sm text-gray-300">Request permanent removal of your data</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="font-bold text-green-300 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Opt-out of emails
                </div>
                <p className="text-sm text-gray-300">Unsubscribe from our communications</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p>
                To exercise these rights, contact us at: 
                <a href="mailto:privacy@gbarchive.com" className="ml-2 text-yellow-400 hover:text-yellow-300 underline">
                  privacy@gbarchive.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-5 rounded-lg border-2 border-blue-600">
            <h2 className="text-xl font-bold mb-4 text-blue-400">
              <span className="mr-2">5.</span> Policy Changes
            </h2>
            <div className="flex">
              <div className="bg-blue-900 w-16 h-16 flex items-center justify-center text-4xl rounded-lg mr-4 flex-shrink-0">
                <span>⚠️</span>
              </div>
              <p>
                We may update this Privacy Policy periodically. The latest version will always be posted on this page. 
                Significant changes will be communicated through our website notice.
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-400 text-center">
              Game Boy Advance Archive is committed to protecting your privacy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
