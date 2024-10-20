
import { useState } from 'react';

interface Toast {
  id: string;
  message: string;
  description?: string;
  title?: string;
  variant?: "success" | "destructive";
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts([...toasts, toast]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t !== toast));
    }, 3000);
  };

  return { toasts, addToast };
};
