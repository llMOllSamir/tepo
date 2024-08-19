import type { Metadata } from "next";
import "swiper/css";
import "./globals.css";
import Header from "./components/header/Header";
import ReduxProvider from "./Redux/ReduxProvider";
import Footer from "./components/footer/Footer";
import BottomNav from "./components/bottom nav/BottomNav";
import NavBar from "./components/navbar/NavBar";


export const metadata: Metadata = {
  title: {
    default: "Tepo Shopping",
    template: "Tepo : %s",
  },
  description: `Tepo Shopping Is Your Way To find What You Searching For We Will Help You And We Will Make You Happy And Satisfied , mobile electronic , Clothes ,ETC...
    تيبو للتسوق الالكتروني هذا الموقع في خدمه بيع البضائع عن طريق الانترنت وسوف تصلك اليك اينما كنت 
  `,
};

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="scroll-smooth">
        <ReduxProvider >
          <Header />
          <NavBar />
          {modal}
          <main>{children}</main>
          <BottomNav />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

