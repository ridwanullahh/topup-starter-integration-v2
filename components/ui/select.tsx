
import React, { ReactNode } from 'react';

interface SelectProps {
  children: ReactNode;
  [key: string]: unknown;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select {...props} className="px-4 py-2 border rounded">
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="select-trigger">{children}</div>
);

export const SelectValue: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="select-value">{children}</div>
);

export const SelectContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="select-content">{children}</div>
);

export const SelectItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="select-item">{children}</div>
);
