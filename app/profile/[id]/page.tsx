import ThaiModelApp from '../../../components/ThaiModelApp'
export default function Page({ params }: { params: { id: string } }){ return <ThaiModelApp initialPage="profile" profileId={params.id} /> }
