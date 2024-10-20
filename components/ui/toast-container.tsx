
import React from 'react';

interface Toast {
  id: string;
  message: string;
}

interface ToastContainerProps {
  toasts: Toast[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed top-0 right-0 p-4 space-y-2">
      {toasts.map((toast, index) => (
        <div key={index} className="bg-gray-800 text-white p-2 rounded">
          {toast.message}
        </div>
      ))}
    </div>
  );
};
