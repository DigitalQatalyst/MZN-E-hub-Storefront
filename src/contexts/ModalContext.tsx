"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  open: (modalType?: string) => void;
  close: () => void;
  modalType?: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<string | undefined>(undefined);

  const open = (type?: string) => {
    setModalType(type);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setModalType(undefined);
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close, modalType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}; 