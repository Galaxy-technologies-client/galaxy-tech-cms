import { Poppins } from 'next/font/google'
import './styles.css'
import NextTopLoader from 'nextjs-toploader'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white text-text antialiased`}>
        <NextTopLoader color="#009ACF" showSpinner={false} height={3} />
        {children}
      </body>
    </html>
  )
}
