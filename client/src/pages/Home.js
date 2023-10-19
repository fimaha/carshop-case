import CarModelList from '../components/CarModelList';

export default function Home() {
    return (
        <>
            <h1 className="home-padded-left">Imagine the possibilities.</h1>
            <CarModelList /> {/* Add the CarModelList component here */}
        </>
    )
}