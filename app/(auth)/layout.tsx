import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen w-full font-inter justify-center">
            {children}
            <div className="auth-asset">
              <div>
                <Image src="/icons/auth-image.svg" alt="Auth image"
                width={500} height={500} />  
              </div>
            </div>
        </main>
    );
}
