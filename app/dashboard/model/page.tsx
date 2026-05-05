'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function ModelDashboard(){
 const [nickname,setNickname]=useState(''); const [city,setCity]=useState('Bangkok'); const [about,setAbout]=useState(''); const [msg,setMsg]=useState('')
 async function save(){ const { data:{user} } = await supabase.auth.getUser(); if(!user){setMsg('Connecte-toi d’abord.');return} const { error }= await supabase.from('profiles').upsert({user_id:user.id, role:'model', nickname, city, about, status:'pending', active_plan:false},{onConflict:'user_id'}); setMsg(error?error.message:'Profil envoyé en validation admin.') }
 return <div className="section"><h1>Dashboard modèle</h1><p className="status">Statut par défaut : pending. Visible seulement après validation admin + plan actif.</p><div className="field"><label>Nom public</label><input value={nickname} onChange={e=>setNickname(e.target.value)}/></div><div className="field"><label>Ville</label><select value={city} onChange={e=>setCity(e.target.value)}><option>Bangkok</option><option>Pattaya</option><option>Koh Samui</option><option>Phuket</option></select></div><div className="field"><label>À propos</label><textarea value={about} onChange={e=>setAbout(e.target.value)}/></div><button className="btn" onClick={save}>Sauvegarder mon profil</button>{msg&&<p className="status">{msg}</p>}</div>
}
