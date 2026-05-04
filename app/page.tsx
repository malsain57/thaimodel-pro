import ProfileCard from '@/components/ProfileCard'
import { demoProfiles } from '@/lib/demo'

export default function HomePage(){
  return <div className="section">
    <div className="hero"><h1>ThaiModel PRO</h1><p>Plateforme mobile-first de visibilité pour profils modèles/companions. Abonnements, boosts, validation admin et espaces utilisateurs.</p></div>
    <div className="tabs"><span className="pill">342 online</span><span className="pill">VIP</span><span className="pill">SELECT</span><span className="pill">Verified</span></div>
    <div className="grid">{demoProfiles.map(p => <ProfileCard key={p.id} profile={p}/>)}</div>
  </div>
}
