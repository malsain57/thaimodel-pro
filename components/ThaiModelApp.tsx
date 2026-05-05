'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { demoProfiles, regions, slugify, type Profile } from '../lib/demo'

type PageName = 'home' | 'city' | 'profile' | 'pricing' | 'faq' | 'terms' | 'privacy' | 'contact' | 'login' | 'register' | 'model' | 'client' | 'admin'

type Props = {
  initialPage?: PageName
  citySlug?: string
  profileId?: string
}

function normaliseProfile(row: any): Profile {
  return {
    id: row.id,
    user_id: row.user_id,
    nickname: row.nickname || 'New profile',
    age: row.age || 18,
    city: row.city || 'Bangkok',
    region: row.region || row.city || 'Thailand',
    type: row.profile_type || row.type || 'lady',
    plan: row.plan || 'free',
    is_approved: row.is_approved,
    verified: row.verified,
    online: row.online,
    is_new: row.is_new,
    views: row.views || 0,
    today_views: row.today_views || 0,
    about: row.about || '',
    whatsapp: row.whatsapp || '',
    cover_url: row.cover_url || row.photo_url || '',
    photo_url: row.photo_url || row.cover_url || '',
    nationality: row.nationality || 'Thai',
    height: row.height || '',
    weight: row.weight || '',
    languages: row.languages || ['Thai', 'English'],
  }
}

function Header({ openMenu }: { openMenu: () => void }) {
  const [langOpen, setLangOpen] = useState(false)
  return (
    <>
      <div className="header">
        <button className="hamburger" onClick={openMenu} aria-label="Open menu"><div></div><div></div><div></div></button>
        <Link className="header-logo" href="/">ThaiModel<span>.com</span></Link>
        <button className="lang-btn" onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen) }}><span className="flag">🇬🇧</span><span className="lcode">EN</span></button>
        <div className={`lang-dd ${langOpen ? 'open' : ''}`}>
          {['🇬🇧 English','🇫🇷 Français','🇹🇭 ภาษาไทย','🇩🇪 Deutsch','🇪🇸 Español','🇨🇳 中文'].map((l, i) => <div key={l} className={`lang-opt ${i === 0 ? 'active' : ''}`}>{l}</div>)}
        </div>
      </div>
    </>
  )
}

function SideMenu({ open, close }: { open: boolean; close: () => void }) {
  return (
    <>
      <div className={`overlay ${open ? 'open' : ''}`} onClick={close}></div>
      <div className={`side-menu ${open ? 'open' : ''}`}>
        <div className="sm-head">
          <div className="sm-auth">
            <Link className="sm-auth-btn main" href="/auth/login" onClick={close}>Se connecter</Link>
            <Link className="sm-auth-btn" href="/auth/register" onClick={close}>Inscription</Link>
            <button style={{padding:'14px 12px',cursor:'pointer',color:'rgba(255,255,255,.8)', background:'transparent', border:0}} onClick={close}>☰</button>
          </div>
          <div className="sm-logo-row"><div className="sm-logo">ThaiModel.com</div></div>
        </div>
        <div className="sm-body">
          <div className="sm-section"><div className="sm-section-title">Accueil</div><Link className="sm-item" href="/" onClick={close}><div className="left"><span className="ico">🏠</span>Accueil</div></Link></div>
          <div className="sm-section">
            <div className="sm-section-title">Catégories</div>
            <Link className="sm-item" href="/city/all" onClick={close}><div className="left"><span className="ico">✨</span>Nouveaux</div><span className="badge">NEW</span></Link>
            <Link className="sm-item" href="/city/online" onClick={close}><div className="left"><span className="ico">🟢</span>En ligne</div><span className="count">(342)</span></Link>
            <Link className="sm-item" href="/city/chat" onClick={close}><div className="left"><span className="ico">💬</span>Dans le chat</div><span className="count">(123)</span></Link>
            <Link className="sm-item" href="/city/models" onClick={close}><div className="left"><span className="ico">💃</span>Models</div></Link>
            <Link className="sm-item" href="/city/exclusive" onClick={close}><div className="left"><span className="ico">⭐</span>Profils exclusifs</div></Link>
            <Link className="sm-item" href="/city/ladyboy" onClick={close}><div className="left"><span className="ico">🏳️‍⚧️</span>LadyBoy / TS</div></Link>
            <Link className="sm-item" href="/city/couples" onClick={close}><div className="left"><span className="ico">💑</span>Couples</div></Link>
            <Link className="sm-item" href="/city/top-50" onClick={close}><div className="left"><span className="ico">🏆</span>Top 50</div></Link>
            <Link className="sm-item" href="/city/video" onClick={close}><div className="left"><span className="ico">🎥</span>Video profiles</div><span className="count">(2712)</span></Link>
          </div>
          <div className="sm-section"><div className="sm-section-title">Recherche</div><Link className="sm-item" href="/city/all" onClick={close}><div className="left"><span className="ico">🔍</span>Rechercher</div></Link><Link className="sm-item" href="/city/all" onClick={close}><div className="left"><span className="ico">📍</span>Par ville</div></Link></div>
          <div className="sm-section"><div className="sm-section-title">Mon compte</div><Link className="sm-item pink-txt" href="/auth/register" onClick={close}><div className="left"><span className="ico">💃</span>Déposer mon annonce</div></Link><Link className="sm-item" href="/dashboard/model" onClick={close}><div className="left"><span className="ico">📊</span>Mon Dashboard</div></Link><Link className="sm-item" href="/pricing" onClick={close}><div className="left"><span className="ico">💎</span>Plans & Tarifs</div></Link></div>
          <div className="sm-section"><div className="sm-section-title">Aide</div><Link className="sm-item" href="/terms" onClick={close}><div className="left"><span className="ico">📄</span>Terms & Conditions</div></Link><Link className="sm-item" href="/privacy" onClick={close}><div className="left"><span className="ico">🔐</span>Privacy</div></Link><Link className="sm-item" href="/contact" onClick={close}><div className="left"><span className="ico">✉️</span>Contact</div></Link></div>
        </div>
        <div className="sm-foot"><Link className="sm-btn filled" href="/auth/register" onClick={close}>💃 Déposer mon annonce</Link><Link className="sm-btn outline" href="/auth/login" onClick={close}>Se connecter</Link></div>
      </div>
    </>
  )
}

function AgeGate() {
  const [closed, setClosed] = useState(false)
  const [agreed, setAgreed] = useState(false)
  useEffect(() => { if (typeof window !== 'undefined' && localStorage.getItem('age-ok') === '1') setClosed(true) }, [])
  const ok = () => { localStorage.setItem('age-ok', '1'); setClosed(true) }
  return (
    <div className={`age-gate-overlay ${closed ? 'closed' : ''}`}>
      <div className="age-gate-box">
        <div className="age-gate-top"><div className="logo">ThaiModel<span>.com</span></div></div>
        <div className="age-warn">⚠️ Ce site est réservé à un public majeur et averti.</div>
        <div className="age-body">
          <p><strong>Avertissement</strong></p>
          <p>Cette partie du site est un service réservé à un public majeur et averti. Ce service peut contenir des textes et des photos qui peuvent être choquants pour certaines sensibilités.</p>
          <p><strong>Je certifie sur l'honneur :</strong><br/>- être majeur selon la loi en vigueur dans mon pays de résidence,<br/>- être informé du caractère adulte de cette partie du site,<br/>- consulter ce service à titre personnel.</p>
          <p><strong>Censure et respect des lois internationales</strong><br/>Toute annonce ne respectant pas les règles sera censurée. La plateforme vend uniquement de la visibilité de profils et ne gère aucune prestation.</p>
        </div>
        <div className="age-foot">
          <div className="red">Je certifie être d'accord avec les règles qui précèdent :</div>
          <label className="age-check"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /><span>J'ai lu et j'accepte les <Link href="/terms">terms and conditions</Link></span></label>
          <div className="dob-label">Veuillez saisir votre date de naissance</div>
          <div className="dob-row"><select><option>Jour</option>{Array.from({length:31},(_,i)=><option key={i}>{i+1}</option>)}</select><select><option>Mois</option><option>Janvier</option><option>Février</option><option>Mars</option></select><select><option>Année</option>{Array.from({length:80},(_,i)=><option key={i}>{2008-i}</option>)}</select></div>
          <div className="age-btns"><button className="age-btn-cancel" onClick={() => location.href='https://google.com'}>Annuler</button><button className="age-btn-ok" disabled={!agreed} onClick={ok}>OK</button></div>
        </div>
      </div>
    </div>
  )
}

function ProfileCard({ profile }: { profile: Profile }) {
  const planLabel = profile.plan === 'select' ? 'SELECT' : profile.plan === 'vip' ? 'VIP' : profile.plan === 'starter' ? 'STARTER' : ''
  return (
    <Link className="pcard" href={`/profile/${profile.id}`}>
      <div className={`pcard-img ${profile.cover_url ? 'has-photo' : ''}`} style={!profile.cover_url ? {background:'linear-gradient(135deg,#f8d7e3,#f4b8d0)'} : undefined}>
        {planLabel && <div className="vip-badge" style={profile.plan === 'vip' ? {background:'linear-gradient(135deg,#9B59B6,#6C3483)'} : undefined}>{planLabel}</div>}
        {profile.online && <div className="online-dot"></div>}
        {profile.is_new && <div className="new-badge">NEW</div>}
        {profile.type === 'ladyboy' && <div className="type-badge">LadyBoy</div>}
        {profile.cover_url ? <img className="profile-photo-real" src={profile.cover_url} alt={profile.nickname}/> : <div className="av" style={{background:'#F4548A'}}>{profile.nickname?.[0] || 'T'}</div>}
        {profile.plan === 'select' && <div className="top-bar">TOP GIRL</div>}
        {profile.verified && <div className="verified-badge">✓ VERIFIED</div>}
      </div>
      <div className="name-bar">{profile.nickname}</div>
    </Link>
  )
}

function HomePage({ profiles }: { profiles: Profile[] }) {
  const [type, setType] = useState('all')
  const [q, setQ] = useState('')
  const filtered = profiles.filter(p => (type === 'all' || p.type === type) && p.nickname.toLowerCase().includes(q.toLowerCase()))
  return (
    <div id="page-home" className="page active">
      <div className="stats-bar"><div className="stat-item"><span className="stat-num" style={{color:'var(--green)'}}>342</span><span>Online now</span></div><div className="stat-item"><span className="stat-num">8,762</span><span>Total profiles</span></div><div className="stat-item"><span className="stat-num">+47</span><span>New today</span></div></div>
      <div className="browse-section"><div className="browse-title">Browse by location</div>{regions.map(r=><details key={r.name} className="region-item"><summary className="region-hdr"><span className="region-name">{r.name}</span><span className="region-right"><span className="region-count">{r.count}</span><span className="region-arr">▼</span></span></summary><div className="region-cities" style={{display:'block'}}><div className="city-grid">{r.cities.map(c=><Link className="city-chip" key={c.name} href={`/city/${slugify(c.name)}`}>{c.name} ({c.count})</Link>)}</div></div></details>)}<div className="browse-total"><span>Total : <strong>8,762</strong></span><Link className="view-all" href="/city/all">View all →</Link></div></div>
      <div className="filters-bar"><button className={`filter-btn ${type==='all'?'active':''}`} onClick={()=>setType('all')}>All</button><button className={`filter-btn ${type==='lady'?'active':''}`} onClick={()=>setType('lady')}>Lady</button><button className={`filter-btn ${type==='ladyboy'?'active':''}`} onClick={()=>setType('ladyboy')}>LadyBoy</button></div>
      <div className="search-wrap"><div className="search-box"><span style={{color:'var(--pink)'}}>🔍</span><input placeholder="Search by nickname..." value={q} onChange={e=>setQ(e.target.value)}/></div></div>
      <div className="profile-grid">{filtered.map(p=><ProfileCard key={p.id} profile={p}/>)}</div><Footer />
    </div>
  )
}

function CityPage({ profiles, citySlug }: { profiles: Profile[]; citySlug?: string }) {
  const [showFilters, setShowFilters] = useState(false)
  const [type, setType] = useState('all')
  const cityLabel = citySlug && citySlug !== 'all' ? citySlug.replaceAll('-', ' ') : 'Thailand'
  const visible = profiles.filter(p => (citySlug === 'all' || !citySlug || slugify(p.city) === citySlug || slugify(p.region || '') === citySlug || ['online','models','exclusive','top-50','video','chat','ladyboy'].includes(citySlug)) && (type === 'all' || p.type === type))
  return (
    <div id="page-city" className="page active">
      <div className="city-page-header"><div className="city-breadcrumb"><Link href="/">🏠 Accueil</Link> › <span>Thailand</span> › <span>{cityLabel}</span></div><div className="city-title">Profiles à <span>{cityLabel}</span></div><div className="city-count">{visible.length || profiles.length} résultats</div></div>
      <div className={`adv-filter-toggle ${showFilters ? 'open' : ''}`} onClick={()=>setShowFilters(!showFilters)}><span className="lbl">🔍 Filtrer les résultats</span><span className="arr">▼</span></div>
      <div className={`adv-filters ${showFilters ? 'open' : ''}`}><div style={{paddingTop:10}}><div className="adv-row"><span className="adv-label">Showname</span><input className="adv-input" placeholder="Rechercher..."/></div><div className="adv-row"><span className="adv-label">Téléphone</span><input className="adv-input" placeholder="Numéro..."/></div>{['Sexe','Ethnique','Cup','Cheveux','Langues'].map(label=><div key={label}><div className="adv-row"><span className="adv-label">{label}</span><button className="adv-plus">+</button></div></div>)}<div className="adv-row"><span className="adv-label">Âge</span><div className="adv-range"><select><option>18</option><option>25</option><option>30</option></select><span>–</span><select><option>30</option><option>40</option><option>60</option></select></div></div><div className="adv-toggle-row"><span className="adv-toggle-label">Afficher uniquement les profils vérifiés</span><label className="toggle-sw"><input type="checkbox"/><span className="toggle-slider"></span></label></div><button className="adv-apply-btn">Appliquer les filtres</button></div></div>
      <div className="sort-row"><label>Affichage :</label><select><option>Galerie vue</option><option>Liste</option><option>Les plus récents</option><option>Les plus vus</option></select></div>
      <div className="filters-bar"><button className={`filter-btn ${type==='all'?'active':''}`} onClick={()=>setType('all')}>All</button><button className={`filter-btn ${type==='lady'?'active':''}`} onClick={()=>setType('lady')}>Lady</button><button className={`filter-btn ${type==='ladyboy'?'active':''}`} onClick={()=>setType('ladyboy')}>LadyBoy</button></div>
      <div className="search-wrap"><div className="search-box"><span style={{color:'var(--pink)'}}>🔍</span><input placeholder="Search by nickname..."/></div></div>
      <div className="profile-grid">{(visible.length ? visible : profiles).map(p=><ProfileCard key={p.id} profile={p}/>)}</div><Footer />
    </div>
  )
}

function ProfilePage({ profiles, profileId }: { profiles: Profile[]; profileId?: string }) {
  const p = profiles.find(x => x.id === profileId) || profiles[0] || demoProfiles[0]
  const [tab, setTab] = useState<'about'|'contact'|'comments'>('about')
  return (
    <div id="page-profile" className="page active">
      <div className="profile-nav"><Link className="nav-arr" href="/">←</Link><span className="pname">{p.nickname}</span><span className="nav-arr">→</span></div>
      <div className="profile-tabs"><button className={`ptab ${tab==='about'?'active':''}`} onClick={()=>setTab('about')}>À propos</button><button className={`ptab ${tab==='contact'?'active':''}`} onClick={()=>setTab('contact')}>Contact</button><button className={`ptab ${tab==='comments'?'active':''}`} onClick={()=>setTab('comments')}>Commentaires</button></div>
      <div className="profile-hero"><div className={`profile-hero-img ${p.cover_url ? 'has-photo':''}`} style={!p.cover_url ? {background:'linear-gradient(135deg,#f8d7e3,#f4b8d0)'} : undefined}>{p.cover_url ? <img className="profile-photo-real" src={p.cover_url} alt={p.nickname}/> : <div style={{width:130,height:130,borderRadius:'50%',background:'var(--pink)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:52,fontWeight:900,color:'#fff'}}>{p.nickname?.[0]}</div>}<span className="plan-tag">⭐ {p.plan?.toUpperCase()}</span>{p.verified && <span className="verified-tag">✓ VÉRIFIÉ</span>}<span className="photo-count">📷 {p.plan === 'select' ? '15' : p.plan === 'vip' ? '∞' : '3'} photos</span></div><div className="photo-gallery"><div className="photo-thumb active">📸</div><div className="photo-thumb">🌸</div><div className="photo-thumb">✨</div><div className="photo-thumb">🌺</div><div className="photo-thumb">💫</div></div></div>
      <div className="profile-meta-bar"><div className="pmeta-item">En ligne : <b>{p.online ? '09:22' : 'hier'}</b></div><div className="pmeta-item">Vues : <b>{p.views?.toLocaleString()}</b></div><div className="pmeta-item">Aujourd'hui : <b>{p.today_views}</b></div></div>
      {tab === 'about' && <div className="profile-body"><div className="section"><div className="section-title">ℹ️ Notions personnelles</div><div className="info-grid"><div className="info-lbl">Sexe</div><div className="info-val">{p.type}</div><div className="info-lbl">Nationalité</div><div className="info-val">{p.nationality}</div><div className="info-lbl">Âge</div><div className="info-val">{p.age}</div><div className="info-lbl">Taille</div><div className="info-val">{p.height || '170cm'}</div><div className="info-lbl">Poids</div><div className="info-val">{p.weight || '55kg'}</div><div className="info-lbl">Disponibilités</div><div className="info-val">Contact direct</div></div></div><div className="section"><div className="section-title">🌐 Langues</div><div className="info-grid">{(p.languages || ['Thai','English']).map(l=><><div className="info-lbl" key={l}>{l}</div><div className="stars">★★★★☆</div></>)}</div></div><div className="section"><div className="section-title">💬 À propos de moi</div><p className="about-text">{p.about}</p></div><div className="section"><div className="section-title">🌹 Roses</div><div className="price-list"><div className="price-item"><span className="price-time">Profil visible</span><span className="price-val">🌹🌹</span></div><div className="price-item"><span className="price-time">Contact direct</span><span className="price-val">Sur demande</span></div></div></div></div>}
      {tab === 'contact' && <div className="profile-body"><div className="section"><div className="section-title">📍 Contact</div><div className="contact-box"><div className="contact-row"><span className="contact-lbl">City</span><span className="contact-val">{p.city}</span></div><div className="contact-row"><span className="contact-lbl">WhatsApp</span><span className="contact-val green">{p.whatsapp ? '✓ Available' : '—'}</span></div></div>{p.whatsapp && <a className="whatsapp-btn" href={`https://wa.me/${p.whatsapp.replace(/[^0-9]/g,'')}`}>💬 Contact WhatsApp</a>}<div className="external-contact">ThaiModel ne prend aucune commission et ne gère aucune prestation.</div></div></div>}
      {tab === 'comments' && <div className="profile-body"><div className="rating-overview"><div className="rating-big">4.8</div><div><div className="rating-stars-big">★★★★★</div><div className="rating-count">12 commentaires vérifiés</div></div></div><div className="comment"><div className="comment-hd"><span className="comment-user">@Kevin75019</span><span className="comment-date">23/11/2025</span></div><div className="comment-stars">★★★★★</div><p className="comment-text">Profil clair, réponse rapide, informations conformes.</p></div></div>}
      <Footer />
    </div>
  )
}

function PricingPage() { return <div className="page active"><div className="pricing-wrap"><div className="page-title">Plans & Tarifs</div><p className="page-sub">Choisissez votre visibilité. ThaiModel vend uniquement un emplacement de profil.</p><div className="pricing-cards"><Plan name="Starter 1 Semaine" price="฿ 1,300" desc="Idéal pour tester" features={['3 photos sur le profil','Support email','Statistiques basiques']}/><Plan featured name="Select 2 Semaines ⭐" price="฿ 2,000" desc="Best seller" features={['15 photos sur le profil','1 vidéo','Badge SELECT visible','Analytics avancé']}/><Plan name="1 Mois" price="฿ 3,500" desc="Économisez avec cette option" features={['Photos illimitées','3 vidéos','Badge VIP visible','Support prioritaire']}/></div></div><Footer /></div> }
function Plan({name,price,desc,features,featured}:{name:string;price:string;desc:string;features:string[];featured?:boolean}){return <div className={`plan-card ${featured?'featured':''}`}><div className="plan-name">{name}</div><div className="plan-desc">{desc}</div><div className="plan-price">{price}</div><ul className="plan-features">{features.map(f=><li key={f}>{f}</li>)}</ul><Link className="buy-btn" href="/auth/register">Acheter</Link></div>}

function AuthPage({ mode }: { mode: 'login'|'register' }) {
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [role, setRole] = useState<'model'|'client'>('model')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [city, setCity] = useState('Bangkok')
  const [type, setType] = useState('lady')
  const [msg, setMsg] = useState('')
  async function submit() {
    setMsg('')
    if (!hasSupabase) return setMsg('Supabase env missing')
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return setMsg(error.message)
      location.href = role === 'model' ? '/dashboard/model' : '/dashboard/client'
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return setMsg(error.message)
      if (data.user) {
        await supabase.from('profiles').insert({ user_id: data.user.id, role, nickname, city, profile_type: type, is_approved: role === 'client', plan: role === 'client' ? 'free' : 'starter', active_plan: false })
      }
      setMsg('Compte créé. Si email confirmation active, confirmez votre email. Profil modèle en attente validation admin.')
    }
  }
  return <div className="page active"><div className="auth-wrap"><div className="auth-toggle"><button className={`auth-tab ${!isLogin?'active':''}`} onClick={()=>setIsLogin(false)}>Créer un compte</button><button className={`auth-tab ${isLogin?'active':''}`} onClick={()=>setIsLogin(true)}>Se connecter</button></div>{!isLogin && <><div className="auth-title">Rejoindre ThaiModel</div><p className="auth-sub">Choisissez votre type de compte</p><div className="role-picker"><div className={`role-card ${role==='model'?'selected':''}`} onClick={()=>setRole('model')}><div className="role-icon">💃</div><div className="role-name">Model</div><div className="role-desc">Déposer mon annonce</div></div><div className={`role-card ${role==='client'?'selected':''}`} onClick={()=>setRole('client')}><div className="role-icon">👤</div><div className="role-name">Client</div><div className="role-desc">Voir & commenter</div></div></div><div className="field"><label>Pseudo</label><input value={nickname} onChange={e=>setNickname(e.target.value)} /></div>{role==='model' && <><div className="field"><label>Région</label><select value={city} onChange={e=>setCity(e.target.value)}>{regions.map(r=><option key={r.name}>{r.name}</option>)}</select></div><div className="field"><label>Type de profil</label><select value={type} onChange={e=>setType(e.target.value)}><option value="lady">Lady</option><option value="ladyboy">LadyBoy</option><option value="couple">Couple</option></select></div></>}</>}<div className="field"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@email.com"/></div><div className="field"><label>Mot de passe</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></div><button className="submit-btn" onClick={submit}>{isLogin ? 'Se connecter' : 'Créer mon compte'}</button>{msg && <p className={msg.includes('créé') ? 'success-msg' : 'err-msg'}>{msg}</p>}</div><Footer /></div>
}

function ModelDashboard() {
  const [session, setSession] = useState<any>(null), [profile, setProfile] = useState<any>(null), [msg, setMsg] = useState('')
  const [form, setForm] = useState<any>({ nickname:'', age:26, city:'Bangkok', about:'', whatsapp:'', plan:'starter', profile_type:'lady' })
  useEffect(()=>{ supabase.auth.getSession().then(({data})=>{setSession(data.session); if(data.session) load(data.session.user.id)}) },[])
  async function load(userId:string){ const {data}=await supabase.from('profiles').select('*').eq('user_id',userId).maybeSingle(); if(data){setProfile(data); setForm({...form,...data})}}
  async function save(){ if(!session) return setMsg('Connecte-toi avant.'); const payload={...form,user_id:session.user.id,role:'model',is_approved:profile?.is_approved || false,active_plan:profile?.active_plan || false}; const {data,error}=profile?.id ? await supabase.from('profiles').update(payload).eq('id',profile.id).select().single() : await supabase.from('profiles').insert(payload).select().single(); if(error)return setMsg(error.message); setProfile(data); setMsg('Profil sauvegardé. Il sera visible après validation admin + plan actif.')}
  async function upload(e:any){ const file=e.target.files?.[0]; if(!file || !profile) return setMsg('Sauvegarde le profil avant upload.'); const path=`${profile.id}/${Date.now()}-${file.name}`; const up=await supabase.storage.from('photos').upload(path,file,{upsert:true}); if(up.error)return setMsg(up.error.message); const {data}=supabase.storage.from('photos').getPublicUrl(path); await supabase.from('profiles').update({cover_url:data.publicUrl}).eq('id',profile.id); setForm({...form,cover_url:data.publicUrl}); setMsg('Photo uploadée.') }
  return <div className="page active"><div className="dash-head"><div className="dash-greeting">👋 Dashboard Model</div><div className="dash-sub">Gérez votre profil et votre visibilité</div></div><div className="dash-stats"><div className="dash-stat"><span className="dash-stat-num">{profile?.is_approved?'Approved':'Pending'}</span><span className="dash-stat-lbl">Status</span></div><div className="dash-stat"><span className="dash-stat-num">{profile?.active_plan?'Active':'Inactive'}</span><span className="dash-stat-lbl">Plan</span></div></div><div className="dash-section"><div className="dash-section-title">📸 Mes Photos</div><div className="photo-grid"><div className="photo-slot filled">{form.cover_url ? <img className="photo-preview" src={form.cover_url}/> : <div className="plus">＋</div>}</div><label className="photo-slot"><input className="file-input" type="file" accept="image/*" onChange={upload}/></label><div className="photo-slot"><div className="plus">＋</div></div></div><p className="muted-note">Starter: 3 photos. Select: 15 photos. VIP: illimité.</p></div><div className="dash-section"><div className="dash-section-title">✏️ Edit my profile</div><div className="field"><label>Pseudo</label><input value={form.nickname||''} onChange={e=>setForm({...form,nickname:e.target.value})}/></div><div className="field"><label>Age</label><input type="number" value={form.age||''} onChange={e=>setForm({...form,age:Number(e.target.value)})}/></div><div className="field"><label>City</label><select value={form.city||'Bangkok'} onChange={e=>setForm({...form,city:e.target.value})}>{regions.map(r=><option key={r.name}>{r.name}</option>)}</select></div><div className="field"><label>WhatsApp</label><input value={form.whatsapp||''} onChange={e=>setForm({...form,whatsapp:e.target.value})}/></div><div className="field"><label>About</label><textarea value={form.about||''} onChange={e=>setForm({...form,about:e.target.value})}/></div><div className="select-plan-grid">{['starter','select','vip'].map(pl=><button key={pl} className={form.plan===pl?'active':''} onClick={()=>setForm({...form,plan:pl})}>{pl.toUpperCase()}</button>)}</div><button className="save-btn" onClick={save}>Save profile</button>{msg&&<p className="status-msg">{msg}</p>}</div><Footer /></div>
}

function ClientDashboard(){return <div className="page active"><div className="dash-head"><div className="dash-greeting">👤 Dashboard Client</div><div className="dash-sub">Favoris, commentaires et recherches</div></div><div className="dash-link-row"><Link href="/city/all">Rechercher</Link><Link href="/">Accueil</Link></div><div className="empty-state">Les favoris seront listés ici après connexion.</div><Footer /></div>}

function AdminDashboard(){ const [rows,setRows]=useState<any[]>([]),[msg,setMsg]=useState(''); useEffect(()=>{load()},[]); async function load(){const {data,error}=await supabase.from('profiles').select('*').order('created_at',{ascending:false}); if(error) setMsg(error.message); else setRows(data||[])} async function update(id:string, patch:any){const {error}=await supabase.from('profiles').update(patch).eq('id',id); if(error)setMsg(error.message); else {setMsg('Updated'); load()}} return <div className="page active"><div className="dash-head"><div className="dash-greeting">🛡️ Dashboard Admin</div><div className="dash-sub">Validation/refus des profils, plans et modération</div></div><div className="dash-section"><div className="dash-section-title">Profils</div>{msg&&<p className="status-msg">{msg}</p>}{rows.map(r=><div key={r.id} className="comment"><div className="comment-hd"><span className="comment-user">{r.nickname || 'No name'} · {r.city}</span><span className="comment-date">{r.is_approved?'approved':'pending'}</span></div><p className="comment-text">Plan: {r.plan} · Active: {String(r.active_plan)} · Type: {r.profile_type}</p><div className="admin-actions"><button className="approve" onClick={()=>update(r.id,{is_approved:true,active_plan:true})}>Approve + activate</button><button className="reject" onClick={()=>update(r.id,{is_approved:false,active_plan:false})}>Reject</button></div></div>)}</div><Footer /></div>}

function ContentPage({type}:{type:'terms'|'privacy'|'contact'|'faq'}){ const title={terms:'Terms & Conditions',privacy:'Privacy Policy',contact:'Contact',faq:'FAQ'}[type]; return <div className="page active"><div className="content-wrap"><div className="breadcrumb"><Link href="/">🏠</Link><span className="sep">›</span><span>{title}</span></div><div className="page-title">{title}</div>{type==='contact'?<><p className="page-sub" style={{textAlign:'left'}}>We usually respond within 24 hours.</p><div className="contact-info-box"><div className="contact-info-row"><span className="ico">✉️</span><a href="mailto:contact@thaimodel.com">contact@thaimodel.com</a></div><div className="contact-info-row"><span className="ico">📍</span><span>Bangkok, Thailand</span></div></div><div className="field"><label>Your name</label><input/></div><div className="field"><label>Email</label><input/></div><div className="field"><label>Message</label><textarea/></div><button className="submit-btn">Send message</button></>:<><div className="safe-banner">ThaiModel est une plateforme de visibilité de profils. La plateforme ne prend aucune commission et ne gère aucune prestation extérieure.</div><div className="terms-h2">1. Acceptance of Terms</div><p className="terms-p">By using ThaiModel.com, users agree to follow the platform rules and applicable laws.</p><div className="terms-h2">2. Visibility only</div><p className="terms-p">Subscriptions only provide visibility for profiles. Users remain solely responsible for their content and interactions.</p><div className="terms-h2">3. Moderation</div><p className="terms-p">Profiles can be approved, rejected, hidden or deleted by the admin team.</p></>}</div><Footer /></div>}

function Footer(){return <div className="footer"><Link href="/pricing">Pricing</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></div>}

export default function ThaiModelApp({ initialPage='home', citySlug, profileId }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>(demoProfiles)
  useEffect(()=>{ async function load(){ if(!hasSupabase) return; const {data}=await supabase.from('profiles').select('*').eq('is_approved',true).eq('active_plan',true).limit(50); if(data && data.length) setProfiles(data.map(normaliseProfile)) } load() },[])
  const page = useMemo(()=>{
    switch(initialPage){
      case 'city': return <CityPage profiles={profiles} citySlug={citySlug}/>
      case 'profile': return <ProfilePage profiles={profiles} profileId={profileId}/>
      case 'pricing': return <PricingPage />
      case 'login': return <AuthPage mode="login" />
      case 'register': return <AuthPage mode="register" />
      case 'model': return <ModelDashboard />
      case 'client': return <ClientDashboard />
      case 'admin': return <AdminDashboard />
      case 'terms': return <ContentPage type="terms" />
      case 'privacy': return <ContentPage type="privacy" />
      case 'contact': return <ContentPage type="contact" />
      case 'faq': return <ContentPage type="faq" />
      default: return <HomePage profiles={profiles}/>
    }
  },[initialPage, profiles, citySlug, profileId])
  return <div className="app-outer"><div className="app-shell"><AgeGate/><SideMenu open={menuOpen} close={()=>setMenuOpen(false)}/><Header openMenu={()=>setMenuOpen(true)}/>{page}</div></div>
}
