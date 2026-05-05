'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function RegisterPage(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [role,setRole]=useState('model'); const [msg,setMsg]=useState('')
  async function register(){
    setMsg('Création du compte...')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if(error){ setMsg(error.message); return }
    if(data.user){ await supabase.from('profiles').insert({ user_id:data.user.id, role, nickname: email.split('@')[0], status:'pending', active_plan:false }) }
    setMsg('Compte créé. Vérifie ton email puis connecte-toi.')
  }
  return <div className="section"><h1>Créer un compte</h1><p className="small">Choisis ton rôle : modèle ou client.</p><div className="field"><label>Rôle</label><select value={role} onChange={e=>setRole(e.target.value)}><option value="model">Modèle</option><option value="client">Client</option></select></div><div className="field"><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} /></div><div className="field"><label>Mot de passe</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div><button className="btn" onClick={register}>Créer mon compte</button>{msg && <p className="status">{msg}</p>}</div>
}
