"use client";

interface MessageProps {
  isFromMe: boolean;
  message: string;
}

export default function Message({ isFromMe, message }: MessageProps) {
  return (
    <div
      className={`w-fit p-3 rounded-md ${
        isFromMe
          ? "ml-auto bg-light-blue-600 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <p>{message}</p>
    </div>
  );
}
