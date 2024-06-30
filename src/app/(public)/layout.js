import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <>
      <div  className={"bg-slate-50 flex flex-col justify-between"} >
        <header>
          <Header />
        </header>
        <div className="mt-44 min-h-[900px] w-full mb-8">
          {children}
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>

    </>
  );
}
