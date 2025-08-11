// src/components/legal/EmulatorDisclaimer.tsx
export default function EmulatorDisclaimer() {
    return (
      <div className="bg-gray-800/80 p-6 rounded-xl border-2 border-red-500">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          <span className="text-red-500">⚠️</span> LEGAL DISCLAIMER <span className="text-red-500">⚠️</span>
        </h2>
        
        <div className="text-gray-300">
          <p className="mb-3">
            This emulator is provided for <span className="text-yellow-300">educational and preservation purposes</span> only.
          </p>
          
          <p className="mb-3">
            <span className="font-bold text-yellow-300">You must own an original copy</span> of any game you play. 
            Downloading or distributing ROM files of games you do not own is illegal.
          </p>
          
          <p className="mb-3">
            Game Boy Advance Archive does not distribute or host game ROMs. Users are responsible for providing 
            their own legally obtained game files.
          </p>
          
          <p className="text-center mt-4">
            <span className="text-red-500 font-bold">Respect copyrights</span> - support official game releases!
          </p>
        </div>
      </div>
    );
  }
