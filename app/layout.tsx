import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'ThaiModel PRO', description: 'Profile visibility directory' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><main className="shell"><header className="topbar"><div className="logo">ThaiModel<span>.com</span></div></header><nav className="nav"><Link href="/">Home</Link><Link href="/pricing">Pricing</Link><Link href="/auth/register">Register</Link><Link href="/auth/login">Login</Link><Link href="/dashboard/model">Model</Link><Link href="/dashboard/admin">Admin</Link></nav>{children}<footer className="footer">ThaiModel vend uniquement de la visibilité de profils. Aucune commission sur les échanges privés.</footer></main></body></html>
}
