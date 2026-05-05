import { demoProfiles } from '../../../lib/demo'
export default function ProfilePage({ params }: { params:{id:string} }){
  const p = demoProfiles.find(x=>x.id===params.id) || demoProfiles[0]
  return <div><div className="photo" style={{height:300}}><span className="badge">{p.plan}</span><div className="avatar" style={{width:120,height:120,fontSize:52}}>{p.nickname[0]}</div></div><div className="section"><h1>{p.nickname}</h1><p className="small">{p.city} · {p.views.toLocaleString()} vues · Profil vérifié</p><div className="tabs"><span className="pill">À propos</span><span className="pill">Contact</span><span className="pill">Commentaires</span></div><p className="small">Profil premium avec informations publiques, galerie photos et contact direct. Aucune transaction n’est gérée par ThaiModel.</p><a className="btn" href="/auth/register">Contacter / créer un compte</a></div></div>
}
