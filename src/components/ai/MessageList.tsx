import React from 'react';

interface Message {
  text: string;
  sender: "user" | "ai";
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            message.sender === "user"
              ? "bg-primary-100 ml-auto max-w-[80%]"
              : "bg-gray-100 mr-auto max-w-[80%]"
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
      ))}
    </div>
  );
};