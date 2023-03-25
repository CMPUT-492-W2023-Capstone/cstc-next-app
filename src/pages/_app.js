import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs'

import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
      <ClerkProvider>
        <SignedIn>
            <UserButton />
            <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
            <SignIn />
        </SignedOut>
      </ClerkProvider>
  )
}
