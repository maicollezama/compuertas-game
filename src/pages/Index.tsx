
import MainMenu from "@/components/MainMenu";
import LogicGateGame from "@/components/LogicGateGame";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-gray-800 to-gray-950">
      <MainMenu />
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 mt-8 text-center">
        <span className="text-purple-400">Logic Gate</span> 
        <span className="text-white"> Challenge</span>
      </h1>
      
      <p className="text-lg text-purple-300 mb-8 max-w-lg text-center">
        Test your logic gate knowledge! Press the corresponding key when you see a gate falling.
      </p>
      
      <LogicGateGame />
      
      <div className="mt-10 text-center max-w-md">
        <h2 className="text-2xl text-white mb-3">How to Play</h2>
        <p className="text-gray-300 mb-6">
          Press the key that matches the falling logic gate before it reaches the bottom. 
          Each correct match earns you points! Missing gates or pressing wrong keys costs points.
        </p>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 justify-center">
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">A</span> = AND
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">O</span> = OR
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">N</span> = NOT
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">X</span> = XOR
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">D</span> = NAND
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">R</span> = NOR
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded">
            <span className="font-bold text-purple-400">Z</span> = XNOR
          </div>
        </div>
      </div>
      
      <footer className="mt-auto py-6 text-gray-400 text-sm text-center">
        <p>Logic Gate Challenge - An interactive keyboard game for learning logic gates</p>
      </footer>
    </div>
  );
};

export default Index;
