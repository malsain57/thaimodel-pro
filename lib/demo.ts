export type Profile = {
  id: string
  user_id?: string
  nickname: string
  age: number
  city: string
  region?: string
  type: 'lady' | 'ladyboy' | 'couple' | 'model'
  plan: 'free' | 'starter' | 'select' | 'vip'
  is_approved?: boolean
  verified?: boolean
  online?: boolean
  is_new?: boolean
  views?: number
  today_views?: number
  about?: string
  whatsapp?: string
  cover_url?: string
  photo_url?: string
  photos?: string[]
  height?: string
  weight?: string
  nationality?: string
  languages?: string[]
}

export const regions = [
  { name: 'Bangkok', count: 385, cities: [{ name: 'Sukhumvit', count: 142 }, { name: 'Silom', count: 98 }, { name: 'Sathon', count: 67 }, { name: 'Ratchada', count: 78 }] },
  { name: 'Pattaya', count: 421, cities: [{ name: 'Walking Street', count: 156 }, { name: 'Jomtien', count: 89 }, { name: 'Naklua', count: 65 }, { name: 'Central', count: 111 }] },
  { name: 'Koh Samui', count: 243, cities: [{ name: 'Chaweng', count: 98 }, { name: 'Lamai', count: 72 }, { name: 'Maenam', count: 38 }, { name: 'Bophut', count: 35 }] },
  { name: 'Phuket', count: 264, cities: [{ name: 'Patong', count: 112 }, { name: 'Kata', count: 58 }, { name: 'Karon', count: 49 }, { name: 'Rawai', count: 45 }] },
  { name: 'Chiang Mai', count: 112, cities: [{ name: 'Nimman', count: 48 }, { name: 'Old City', count: 34 }, { name: 'Hang Dong', count: 30 }] },
  { name: 'Koh Phangan', count: 134, cities: [{ name: 'Haad Rin', count: 56 }, { name: 'Thongsala', count: 42 }, { name: 'Srithanu', count: 36 }] },
  { name: 'Krabi', count: 98, cities: [{ name: 'Ao Nang', count: 54 }, { name: 'Krabi Town', count: 44 }] },
]

export const demoProfiles: Profile[] = [
  { id: 'bella', nickname: 'Bella', age: 26, city: 'Chaweng', region: 'Koh Samui', type: 'lady', plan: 'select', verified: true, online: true, views: 209884, today_views: 1317, nationality: 'Thaïlandaise', height: '170cm', weight: '55kg', languages: ['Thai', 'English', 'Français'], about: 'Bonjour et bienvenue sur mon profil. Je suis disponible à Koh Samui. Photos réelles, profil vérifié et réponse rapide.', whatsapp: '+66844980967' },
  { id: 'mathy', nickname: 'Mathy', age: 24, city: 'Sukhumvit', region: 'Bangkok', type: 'lady', plan: 'vip', is_new: true, views: 98450, today_views: 740, nationality: 'Thaïlandaise', about: 'Profil premium à Bangkok, disponible pour contact direct. Présentation soignée et informations vérifiées.' },
  { id: 'paola', nickname: 'Paola', age: 28, city: 'Patong', region: 'Phuket', type: 'lady', plan: 'vip', verified: true, online: true, views: 172330, today_views: 982, nationality: 'Brésilienne', about: 'Modèle internationale basée à Phuket. Profil détaillé, réponse rapide, photos récentes.' },
  { id: 'kelly', nickname: 'Kelly', age: 25, city: 'Walking Street', region: 'Pattaya', type: 'ladyboy', plan: 'starter', views: 55820, today_views: 410, nationality: 'Thaïlandaise', about: 'Profil LadyBoy à Pattaya, actif et régulièrement mis à jour.' },
  { id: 'nana', nickname: 'Nana', age: 22, city: 'Silom', region: 'Bangkok', type: 'lady', plan: 'vip', views: 73140, today_views: 552, nationality: 'Thaïlandaise', about: 'Profil Bangkok avec informations simples, claires et contact direct.' },
  { id: 'joy', nickname: 'Joy', age: 27, city: 'Lamai', region: 'Koh Samui', type: 'ladyboy', plan: 'free', is_new: true, views: 38920, today_views: 298, nationality: 'Thaïlandaise', about: 'Nouveau profil à Koh Samui. Informations disponibles après validation.' },
]

export const slugify = (text: string) => text.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')
