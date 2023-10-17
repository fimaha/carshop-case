export default function Profile() {
    return (
        <>
            <h1>Homepage</h1>
            <ul className="productBox">
                <li>
                    <a href="/product/143" className="productLink"><img className="productImage" src={require('../assets/images/carlogo.png')} alt="cars"></img>  </a>
                    <br /><a href="/product/143" className="productLink">Cars</a>
                </li>
            </ul>
        </>
    )
}