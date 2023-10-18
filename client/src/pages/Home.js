import CarModelList from '../components/CarModelList';

export default function Home() {
    return (
        <>
            <h1 className="home-padded-left">The future is here.</h1>
            <a className="home-padded-left">Join us.</a>
            <CarModelList /> {/* Add the CarModelList component here */}
        </>
    )
}