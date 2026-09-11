import './globals.css'
import type { Metadata } from 'next'
import ClientLayoutWrapper from '../components/ClientLayoutWrapper'

export const metadata: Metadata = {
  title: 'AI Pre-Triage',
  description: 'ระบบคัดกรองผู้ป่วยก่อนถึงโรงพยาบาลด้วย AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning={true}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex justify-center">
          <div className="w-full max-w-md bg-white shadow-xl min-h-screen flex flex-col relative overflow-hidden">
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </div>
        </div>
      </body>
    </html>
  )
}