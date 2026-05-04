import ProfileCard from '@/components/ProfileCard'
import { demoProfiles } from '@/lib/demo'

export default function CityPage({ params }: { params:{city:string} }){
  return <div className="section"><h1>Profils à {decodeURIComponent(params.city)}</h1><div className="tabs"><span className="pill">Online</span><span className="pill">VIP</span><span className="pill">Verified</span></div><div className="grid">{demoProfiles.map(p=><ProfileCard key={p.id} profile={p}/>)}</div></div>
}
