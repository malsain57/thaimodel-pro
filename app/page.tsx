import Link from 'next/link'
import ProfileCard from '../components/ProfileCard'
import { demoProfiles } from '../lib/demo'

const regions = [
  { name: 'Bangkok', count: 385, cities: ['Sukhumvit', 'Silom', 'Sathon', 'Ratchada'] },
  { name: 'Pattaya', count: 421, cities: ['Walking Street', 'Jomtien', 'Naklua', 'Central'] },
  { name: 'Koh Samui', count: 243, cities: ['Chaweng', 'Lamai', 'Maenam', 'Bophut'] },
  { name: 'Phuket', count: 264, cities: ['Patong', 'Kata', 'Karon', 'Rawai'] },
  { name: 'Chiang Mai', count: 112, cities: ['Nimman', 'Old City', 'Hang Dong'] },
  { name: 'Koh Phangan', count: 134, cities: ['Haad Rin', 'Thongsala', 'Srithanu'] },
  { name: 'Krabi', count: 98, cities: ['Ao Nang', 'Krabi Town'] },
]

export default function HomePage() {
  return (
    <main className="app">
      <section className="header">
        <div className="hamburger">☰</div>
        <div className="logo">ThaiModel<span>.com</span></div>
        <Link href="/auth/login" className="loginBtn">EN</Link>
      </section>

      <section className="statsBar">
        <div><strong className="green">342</strong><span>Online now</span></div>
        <div><strong>8,762</strong><span>Total profiles</span></div>
        <div><strong>+47</strong><span>New today</span></div>
      </section>

      <section className="browse">
        <h2>Browse by location</h2>

        {regions.map((region) => (
          <details key={region.name} className="region">
            <summary>
              <span>{region.name}</span>
              <strong>{region.count}</strong>
            </summary>
            <div className="cityGrid">
              {region.cities.map((city) => (
                <Link key={city} href={`/city/${city.toLowerCase().replaceAll(' ', '-')}`}>
                  {city}
                </Link>
              ))}
            </div>
          </details>
        ))}

        <div className="totalLine">
          <span>Total : <strong>8,762</strong></span>
          <Link href="/city/all">View all →</Link>
        </div>
      </section>

      <section className="filters">
        <button className="active">All</button>
        <button>Lady</button>
        <button>LadyBoy</button>
      </section>

      <section className="search">
        <span>🔍</span>
        <input placeholder="Search by nickname..." />
      </section>

      <section className="grid">
        {demoProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </section>

      <footer className="footer">
        <Link href="/pricing">Pricing</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </footer>
    </main>
  )
}
