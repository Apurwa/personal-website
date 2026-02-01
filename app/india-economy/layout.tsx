import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Budget Quest | India\'s Union Budget',
  description: 'Explore India\'s Union Budget through a retro arcade experience. Understand where your taxes go.',
  openGraph: {
    title: 'Budget Quest | India\'s Union Budget',
    description: 'Explore India\'s Union Budget through a retro arcade experience.',
  },
}

export default function IndiaEconomyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-[#00ff41] font-arcade">
      {children}
    </div>
  )
}
