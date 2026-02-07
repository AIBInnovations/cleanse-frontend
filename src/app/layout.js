import "./globals.css";

import ClientLayout from "@/client-layout";

import Menu from "@/components/Menu/Menu";
import Footer from "@/components/Footer/Footer";
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";
import TransitionProvider from "@/providers/TransitionProvider";

export const metadata = {
  title: "Cleanse Ayurveda | Premium Ayurvedic Beauty",
  description: "Discover the ancient wisdom of Ayurveda through our premium skincare and beauty rituals. Handcrafted with pure, natural ingredients.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <ClientLayout footer={<Footer />}>
            <Menu />
            {children}
          </ClientLayout>
          <ShoppingCart />
        </TransitionProvider>
      </body>
    </html>
  );
}
