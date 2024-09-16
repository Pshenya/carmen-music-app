import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import RightSidebarProvider from "@/providers/RightSidebarProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import Player from "@/components/Player/Player";

import "./globals.css";
import { Figtree } from "next/font/google";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carmen",
  description: "Music is limitless inside you",
};

export const revalidate = 0;

export default async function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  const userSongs = await getSongsByUserId();
  const userPlaylists = await getPlaylistsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      {/* <Head>
        <title>My App</title>
        <metadata />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
              <Sidebar songs={userSongs} playlists={userPlaylists}>
                {children}
              </Sidebar>
            <RightSidebarProvider />
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
