'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard(){
 const [profiles,setProfiles]=useState<any[]>([]); const [msg,setMsg]=useState('')
 async function load(){ const {data,error}= await supabase.from('profiles').select('*').order('created_at',{ascending:false}); if(error){setMsg(error.message)} else setProfiles(data||[]) }
 async function approve(id:string){ await supabase.from('profiles').update({status:'approved', active_plan:true}).eq('id',id); load() }
 async function reject(id:string){ await supabase.from('profiles').update({status:'rejected'}).eq('id',id); load() }
 useEffect(()=>{load()},[])
 return <div className="section"><h1>Admin</h1><p className="small">Validation/refus des profils. À sécuriser ensuite avec rôle admin strict.</p>{msg&&<p className="status">{msg}</p>}<table className="table"><tbody>{profiles.map(p=><tr key={p.id}><td>{p.nickname}</td><td>{p.status}</td><td><button onClick={()=>approve(p.id)}>OK</button> <button onClick={()=>reject(p.id)}>Refus</button></td></tr>)}</tbody></table></div>
}
