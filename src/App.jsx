import { useState } from "react";
import abi from "./component/abi.json";
import { ethers } from "ethers";

const contractAddress = "0x34dfBFbf0b272637fa6b19C2f604B6bC8bf365f6";

function App() {
  const [text, setText] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const handleSet = async () => {
    try {
      if (!text) {
        alert("Please enter a message before setting.");
        return;
      }

      if (window.ethereum) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.setMessage(text);
        const txReceipt = await tx.wait();
        console.log("Transaction successful:", txReceipt);
        alert("Message set successfully!");
      } else {
        // console.error("MetaMask not found. Please install MetaMask.");
        alert("MetaMask not found. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error setting message:", error);
      alert(error.message || error);
    }
  };

  const handleGet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const message = await contract.getMessage();
        setCurrentMessage(message);
      } else {
        // console.error("MetaMask not found. Please install MetaMask.");
        alert("MetaMask not found. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error getting message:", error);
      alert(error.message || error);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-xl shadow-lg transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle theme"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          Set Message on Smart Contract
        </h1>

        <input
          type="text"
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full p-3 rounded-lg mb-4 border focus:outline-none focus:ring-2 transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400"
          }`}
        />

        <div className="flex space-x-4 mb-4">
          <button
            onClick={handleSet}
            className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Set Message
          </button>
          <button
            onClick={handleGet}
            className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-200"
          >
            Get Message
          </button>
        </div>

        <p
          className={`text-center p-3 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <span className="font-semibold">Current Message:</span>{" "}
          {currentMessage || "Click Get Message"}
        </p>
      </div>
    </div>
  );
}

export default App;