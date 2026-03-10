import '@/themes/v2/variables.css'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
})

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${jakarta.variable}`} style={{ fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif' }}>
      {children}
    </div>
  )
}
