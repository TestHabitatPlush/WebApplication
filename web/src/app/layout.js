import { Inter } from "next/font/google";
import FirstClient from "./FirstClientLayout";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HabitatPlus - A better society",
  description: "A friendly ecosystem for apartment living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirstClient>{children}</FirstClient>
        <Toaster />
      </body>
    </html>
  );
}
