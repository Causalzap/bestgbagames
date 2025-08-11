import { constructMetadata } from '@/lib/utils';

export const metadata = constructMetadata({
  title: "Terms of Service - Game Boy Advance Archive",
  description: "Terms and conditions for using our website"
});

export default function TermsOfService() {
  return (
    <div className="crt min-h-screen p-4" style={{ backgroundColor: '#181818', color: '#e0e0e0' }}>
      <div className="container mx-auto px-4 max-w-3xl py-10">
        {/* 标题区域 - 复古风格设计 */}
        <div className="border-2 border-blue-600 p-6 mb-10 rounded-lg" 
             style={{ background: 'linear-gradient(to bottom, #3a3a3a, #1a1a1a)', boxShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-400 tracking-wide">
            <span className="inline-block transform -rotate-1">T</span>
            <span className="inline-block transform rotate-2">e</span>
            <span className="inline-block transform -rotate-3">r</span>
            <span className="inline-block transform rotate-1">m</span>
            <span className="inline-block transform -rotate-2">s</span>
            <span className="ml-3 inline-block transform rotate-1">o</span>
            <span className="inline-block transform -rotate-2">f</span>
            <span className="ml-3 inline-block transform rotate-1">S</span>
            <span className="inline-block transform -rotate-3">e</span>
            <span className="inline-block transform rotate-2">r</span>
            <span className="inline-block transform -rotate-1">v</span>
            <span className="inline-block transform rotate-3">i</span>
            <span className="inline-block transform -rotate-2">c</span>
            <span className="inline-block transform rotate-1">e</span>
          </h1>
          <p className="text-center text-blue-500 text-sm tracking-wide">
            Effective: {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        
        {/* 内容区域 - 提高可读性 */}
        <div className="privacy-content" style={{ lineHeight: '1.8' }}>
          <div className="mb-10 pb-6">
            <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-blue-400 mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-300">
                <span className="mr-2">1.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing the <span className="font-mono text-green-400 bg-black px-2 py-1 rounded">&quot;gbarchive.com&quot;</span> website 
                (the &quot;Site&quot;), you agree to be bound by these Terms of Service, all applicable laws and regulations, 
                and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </div>
            
            <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-purple-400 mb-8">
              <h2 className="text-xl font-bold mb-4 text-purple-300">
                <span className="mr-2">2.</span> Intellectual Property
              </h2>
              <ul className="list-none space-y-4">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0">A</span>
                  <div>
                    <span className="font-semibold text-yellow-300">Original Content</span>: 
                    <p className="mt-1">
                      All content created by Game Boy Advance Archive is licensed under 
                      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
                         className="ml-1 text-blue-400 hover:text-blue-300 underline">
                        CC BY-NC-SA 4.0
                      </a>.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0">B</span>
                  <div>
                    <span className="font-semibold text-yellow-300">Game Content</span>:
                    <p className="mt-1">
                      Game screenshots, artwork, and trademarks belong to their respective copyright holders. 
                      All references to Nintendo, Game Boy Advance, and game titles are trademarks of Nintendo.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0">C</span>
                  <div>
                    <span className="font-semibold text-yellow-300">Use Restrictions</span>:
                    <p className="mt-1">
                      You may not use our content for commercial purposes without express written permission.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-yellow-500 mb-8">
              <h2 className="text-xl font-bold mb-4 text-yellow-300">
                <span className="mr-2">3.</span> User Responsibilities
              </h2>
              <p className="mb-4">When using the Site, you agree not to:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">!</span>
                  <span>Violate any applicable laws or regulations</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">!</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">!</span>
                  <span>Upload or transmit viruses or harmful code</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0">!</span>
                  <span>Impersonate any person or entity</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-red-500 mb-8">
              <h2 className="text-xl font-bold mb-4 text-red-300">
                <span className="mr-2">4.</span> Disclaimer
              </h2>
              <p className="mb-4">
                The materials on Game Boy Advance Archive&apos;s website are provided &quot;as is&quot;. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
              
              <div className="flex items-start bg-red-900/30 p-4 rounded-lg border border-red-700 mt-4">
                <span className="bg-red-600 text-white font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full mr-3 flex-shrink-0">!</span>
                <p>
                  <span className="font-bold text-yellow-300">Important:</span> 
                  Game Boy Advance Archive is not affiliated with Nintendo or any game publishers. 
                  This is a fan-made resource website.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-green-500 mb-8">
              <h2 className="text-xl font-bold mb-4 text-green-300">
                <span className="mr-2">5.</span> Limitations
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                  <div className="font-bold text-blue-300 flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                    </svg>
                    Content Accuracy
                  </div>
                  <p className="text-sm text-gray-300">
                    We do not warrant that any content on this site is accurate, complete, or current.
                  </p>
                </div>
                
                <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                  <div className="font-bold text-blue-300
