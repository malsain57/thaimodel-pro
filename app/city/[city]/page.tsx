import ThaiModelApp from '../../../components/ThaiModelApp'
export default function Page({ params }: { params: { city: string } }){ return <ThaiModelApp initialPage="city" citySlug={params.city} /> }
