import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModelProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserID from '@/actions/getSongsByUserID'
import Player from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spoooofi',
  description: 'Listen to tracks by forcz_T (not actually by me ofc, but hey copyright dw about it)',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserID();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
