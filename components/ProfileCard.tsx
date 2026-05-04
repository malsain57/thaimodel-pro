import Link from 'next/link'

export default function ProfileCard({ profile }: { profile: any }) {
  return <Link className="card" href={`/profile/${profile.id}`}>
    <div className="photo"><span className="badge">{profile.plan}</span>{profile.online && <span className="online"/>}<div className="avatar">{profile.nickname?.[0] || 'M'}</div></div>
    <div className="namebar">{profile.nickname}</div>
    <div className="meta">{profile.city} · {profile.views?.toLocaleString()} vues</div>
  </Link>
}
