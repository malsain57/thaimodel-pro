'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function LoginPage(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('')
  async function login(){ const { error } = await supabase.auth.signInWithPassword({ email, password }); setMsg(error ? error.message : 'Connecté. Va dans ton dashboard.') }
  return <div className="section"><h1>Connexion</h1><div className="field"><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} /></div><div className="field"><label>Mot de passe</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div><button className="btn" onClick={login}>Se connecter</button>{msg && <p className="status">{msg}</p>}</div>
}
