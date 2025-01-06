import React from "react";
import Header from "../components/Header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
