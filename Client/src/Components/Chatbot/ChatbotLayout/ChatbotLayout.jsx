import { useState } from "react";
import { Chat } from "../Chat/Chat";
import { Form } from "../Form/Form"
import { FaRobot } from "react-icons/fa"; 

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "How can I help you?",
    },
  ]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="app-container">
      {/* Floating button to toggle chat */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-cyan-600 text-white rounded-full p-3 shadow-lg hover:bg-rose-500 focus:outline-none"
          onClick={toggleChat}
        >
          <FaRobot className="w-6 h-6" />
        </button>
      </div>

      {/* Chat container */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-gradient-to-b from-cyan-200 to-rose-200 border border-gray-300 rounded-xl shadow-lg z-[1000] flex flex-col h-[500px] pb-6 mb-3">
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-2">
              <Chat messages={messages} />
            </div>
            <div className="border-t p-2">
              <Form setMessages={setMessages} messages={messages} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
