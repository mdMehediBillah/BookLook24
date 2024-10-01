import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export const Form = ({ setMessages, messages }) => {
  const URL = import.meta.env.VITE_REACT_APP_URL;
  const [{ stream, message }, setState] = useState({
    stream: true,
    message: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, newMessage]);
    const response = await fetch(`${URL}/api/v1/chat/completions`, {
      method: "POST",
      headers: {
        provider: "open-ai",
        mode: "production",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [...messages, newMessage],
        stream,
      }),
    });

    setState({ stream, message: "" });

    if (stream) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result;
      const messageId = crypto.randomUUID();
      while (!(result = await reader.read()).done) {
        const chunk = decoder.decode(result.value, { stream: true });
        const lines = chunk.split("\n");

        lines.forEach((line) => {
          if (line.startsWith("data:")) {
            const jsonStr = line.replace("data:", "").trim();
            try {
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content;
              if (content) {
                setMessages((prev) => {
                  const found = prev.find((m) => m.id === messageId);

                  if (found) {
                    return prev.map((m) =>
                      m.id === messageId
                        ? { ...m, content: `${m.content}${content}` }
                        : m
                    );
                  }

                  return [
                    ...prev,
                    { role: "assistant", content, id: messageId },
                  ];
                });
              }
            } catch (error) {
              console.error("Failed to parse JSON:", error);
            }
          }
        });
      }
    } else {
      const { message: newMessage } = await response.json();
      setMessages((prev) => [
        ...prev,
        { ...newMessage, id: crypto.randomUUID() },
      ]);
    }
  };

  return (
    <form
      className="flex items-center max-w-md mx-auto bg-white border border-gray-200 rounded-md shadow-sm p-1"
      onSubmit={onSubmit}
    >
      <textarea
        name="message"
        placeholder="Type a message..."
        onChange={handleChange}
        value={message}
        className="flex-grow p-2 ml-2 border-none rounded-full focus:ring-0 focus:outline-none placeholder-gray-500"
        style={{ resize: "none", maxHeight: "50px" }}
      ></textarea>
      <button
        type="submit"
        className="flex items-center justify-center w-11 h-11 bg-rose-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none transition-colors duration-200 ease-in-out mr-2"
      >
        <FaPaperPlane className="w-5 h-5" />
      </button>
    </form>
  );
};
