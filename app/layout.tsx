import './globals.css'
import type { Metadata } from 'next'

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
      <body className="bg-[#F4F9FF] min-h-screen">
        <div className="flex justify-center bg-[#F4F9FF] min-h-screen">
          <div className="w-full max-w-md bg-[#F4F9FF] shadow-xl min-h-screen flex flex-col relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}