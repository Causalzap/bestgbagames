// src/app/terms-of-service/page.tsx
import { constructMetadata } from &quot;@/lib/utils&quot;;

export const metadata = constructMetadata({
  title: &quot;Terms of Service - Game Boy Advance Archive&quot;,
  description: &quot;Terms and conditions for using our website&quot;
});

export default function TermsOfService() {
  return (
    <div className=&quot;crt min-h-screen p-4&quot; style={{ backgroundColor: &quot;#181818&quot;, color: &quot;#e0e0e0&quot; }}>
      <div className=&quot;container mx-auto px-4 max-w-3xl py-10&quot;>
        {/* 标题区域 - 复古风格设计 */}
        <div className=&quot;border-2 border-blue-600 p-6 mb-10 rounded-lg&quot; 
             style={{ background: &quot;linear-gradient(to bottom, #3a3a3a, #1a1a1a)&quot;, boxShadow: &quot;0 4px 12px rgba(0,0,0,0.6)&quot; }}>
          <h1 className=&quot;text-3xl font-bold text-center mb-4 text-blue-400 tracking-wide&quot;>
            <span className=&quot;inline-block transform -rotate-1&quot;>T</span>
            <span className=&quot;inline-block transform rotate-2&quot;>e</span>
            <span className=&quot;inline-block transform -rotate-3&quot;>r</span>
            <span className=&quot;inline-block transform rotate-1&quot;>m</span>
            <span className=&quot;inline-block transform -rotate-2&quot;>s</span>
            <span className=&quot;ml-3 inline-block transform rotate-1&quot;>o</span>
            <span className=&quot;inline-block transform -rotate-2&quot;>f</span>
            <span className=&quot;ml-3 inline-block transform rotate-1&quot;>S</span>
            <span className=&quot;inline-block transform -rotate-3&quot;>e</span>
            <span className=&quot;inline-block transform rotate-2&quot;>r</span>
            <span className=&quot;inline-block transform -rotate-1&quot;>v</span>
            <span className=&quot;inline-block transform rotate-3&quot;>i</span>
            <span className=&quot;inline-block transform -rotate-2&quot;>c</span>
            <span className=&quot;inline-block transform rotate-1&quot;>e</span>
          </h1>
          <p className=&quot;text-center text-blue-500 text-sm tracking-wide&quot;>
            Effective: {new Date().toLocaleDateString(&quot;en-US&quot;, { 
              month: &quot;long&quot;, 
              day: &quot;numeric&quot;, 
              year: &quot;numeric&quot; 
            })}
          </p>
        </div>
        
        {/* 内容区域 - 提高可读性 */}
        <div className=&quot;privacy-content&quot; style={{ lineHeight: &quot;1.8&quot; }}>
          <div className=&quot;mb-10 pb-6&quot;>
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-l-4 border-blue-400 mb-8&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-blue-300&quot;>
                <span className=&quot;mr-2&quot;>1.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing the <span className=&quot;font-mono text-green-400 bg-black px-2 py-1 rounded&quot;>gbarchive.com</span> website 
                (the &quot;Site&quot;), you agree to be bound by these Terms of Service, all applicable laws and regulations, 
                and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </div>
            
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-l-4 border-purple-400 mb-8&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-purple-300&quot;>
                <span className=&quot;mr-2&quot;>2.</span> Intellectual Property
              </h2>
              <ul className=&quot;list-none space-y-4&quot;>
                <li className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-purple-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0&quot;>A</span>
                  <div>
                    <span className=&quot;font-semibold text-yellow-300&quot;>Original Content</span>: 
                    <p className=&quot;mt-1&quot;>
                      All content created by Game Boy Advance Archive is licensed under 
                      <a href=&quot;https://creativecommons.org/licenses/by-nc-sa/4.0/&quot; 
                         className=&quot;ml-1 text-blue-400 hover:text-blue-300 underline&quot;>
                        CC BY-NC-SA 4.0
                      </a>.
                    </p>
                  </div>
                </li>
                <li className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-purple-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0&quot;>B</span>
                  <div>
                    <span className=&quot;font-semibold text-yellow-300&quot;>Game Content</span>:
                    <p className=&quot;mt-1&quot;>
                      Game screenshots, artwork, and trademarks belong to their respective copyright holders. 
                      All references to Nintendo, Game Boy Advance, and game titles are trademarks of Nintendo.
                    </p>
                  </div>
                </li>
                <li className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-purple-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1 flex-shrink-0&quot;>C</span>
                  <div>
                    <span className=&quot;font-semibold text-yellow-300&quot;>Use Restrictions</span>:
                    <p className=&quot;mt-1&quot;>
                      You may not use our content for commercial purposes without express written permission.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-l-4 border-yellow-500 mb-8&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-yellow-300&quot;>
                <span className=&quot;mr-2&quot;>3.</span> User Responsibilities
              </h2>
              <p className=&quot;mb-4&quot;>When using the Site, you agree not to:</p>
              
              <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-4&quot;>
                <div className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0&quot;>!</span>
                  <span>Violate any applicable laws or regulations</span>
                </div>
                <div className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0&quot;>!</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </div>
                <div className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0&quot;>!</span>
                  <span>Upload or transmit viruses or harmful code</span>
                </div>
                <div className=&quot;flex items-start&quot;>
                  <span className=&quot;bg-yellow-600 text-black w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-0.5 flex-shrink-0&quot;>!</span>
                  <span>Impersonate any person or entity</span>
                </div>
              </div>
            </div>
            
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-l-4 border-red-500 mb-8&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-red-300&quot;>
                <span className=&quot;mr-2&quot;>4.</span> Disclaimer
              </h2>
              <p className=&quot;mb-4&quot;>
                The materials on Game Boy Advance Archive&apos;s website are provided &quot;as is&quot;. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
              
              <div className=&quot;flex items-start bg-red-900/30 p-4 rounded-lg border border-red-700 mt-4&quot;>
                <span className=&quot;bg-red-600 text-white font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full mr-3 flex-shrink-0&quot;>!</span>
                <p>
                  <span className=&quot;font-bold text-yellow-300&quot;>Important:</span> 
                  Game Boy Advance Archive is not affiliated with Nintendo or any game publishers. 
                  This is a fan-made resource website.
                </p>
              </div>
            </div>
            
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-l-4 border-green-500 mb-8&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-green-300&quot;>
                <span className=&quot;mr-2&quot;>5.</span> Limitations
              </h2>
              <div className=&quot;flex flex-col md:flex-row gap-6&quot;>
                <div className=&quot;flex-1 bg-gray-800 p-4 rounded-lg&quot;>
                  <div className=&quot;font-bold text-blue-300 flex items-center mb-3&quot;>
                    <svg xmlns=&quot;http://www.w3.org/2000/svg&quot; className=&quot;h-5 w-5 mr-2&quot; viewBox=&quot;0 0 20 20&quot; fill=&quot;currentColor&quot;>
                      <path fillRule=&quot;evenodd&quot; d=&quot;M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z&quot; clipRule=&quot;evenodd&quot; />
                    </svg>
                    Content Accuracy
                  </div>
                  <p className=&quot;text-sm text-gray-300&quot;>
                    We do not warrant that any content on this site is accurate, complete, or current.
                  </p>
                </div>
                
                <div className=&quot;flex-1 bg-gray-800 p-4 rounded-lg&quot;>
                  <div className=&quot;font-bold text-blue-300 flex items-center mb-3&quot;>
                    <svg xmlns=&quot;http://www.w3.org/2000/svg&quot; className=&quot;h-5 w-5 mr-2&quot; viewBox=&quot;0 0 20 20&quot; fill=&quot;currentColor&quot;>
                      <path fillRule=&quot;evenodd&quot; d=&quot;M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z&quot; clipRule=&quot;evenodd&quot; />
                    </svg>
                    Technical Issues
                  </div>
                  <p className=&quot;text-sm text-gray-300&quot;>
                    We are not liable for any errors or interruptions in the availability of the site.
                  </p>
                </div>
              </div>
            </div>
            
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-l-4 border-orange-500 mb-8&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-orange-300&quot;>
                <span className=&quot;mr-2&quot;>6.</span> Governing Law
              </h2>
              <div className=&quot;flex items-start&quot;>
                <div className=&quot;bg-gray-800 w-16 h-16 flex items-center justify-center text-4xl rounded-lg mr-4 flex-shrink-0&quot;>
                  <span>🌎</span>
                </div>
                <p>
                  These Terms shall be governed by the laws of the United States without regard to conflict of law principles. 
                  Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of the United States.
                </p>
              </div>
            </div>
            
            <div className=&quot;bg-gray-900 p-5 rounded-lg border-2 border-blue-600&quot;>
              <h2 className=&quot;text-xl font-bold mb-4 text-blue-400&quot;>
                <span className=&quot;mr-2&quot;>7.</span> Changes to Terms
              </h2>
              <div className=&quot;flex items-start&quot;>
                <div className=&quot;bg-blue-900 w-16 h-16 flex items-center justify-center text-4xl rounded-lg mr-4 flex-shrink-0&quot;>
                  <span>🔄</span>
                </div>
                <div>
                  <p className=&quot;mb-3&quot;>
                    Game Boy Advance Archive may revise these Terms of Service for its website at any time without notice. 
                    By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                  </p>
                  <p className=&quot;text-green-300&quot;>
                    We encourage you to periodically review this page for the latest terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className=&quot;mt-10 text-center border-t border-gray-700 pt-6&quot;>
            <p className=&quot;mb-3&quot;>
              For any questions about these Terms, please contact us at: 
              <a href=&quot;mailto:legal@gbarchive.com&quot; className=&quot;ml-2 text-blue-400 hover:text-blue-300 underline&quot;>
                legal@gbarchive.com
              </a>
            </p>
            <div className=&quot;bg-gray-800 p-4 rounded-lg inline-block mt-4&quot;>
              <p className=&quot;text-xs text-gray-400&quot;>
                Game Boy Advance Archive is not affiliated with or endorsed by Nintendo. 
                Game Boy Advance is a trademark of Nintendo. © {new Date().getFullYear()} Nintendo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
