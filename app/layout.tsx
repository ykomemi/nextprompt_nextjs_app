
import './globals.css'
import Shell from '@/components/Shell'

export const metadata = {
  title: 'NextPrompt.tech — AI-ready Prompt Packs',
  description: 'Pre-sequenced prompts for vibe-coders. Copy, paste, ship.'
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
