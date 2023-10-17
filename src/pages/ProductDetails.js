import { useParams } from "react-router-dom"

export default function ProductDetails() {
    const params = useParams()
    return (
        <>
            <h1>Cars</h1>
            <p>The product ID is {params.id}</p>
        </>
    )
}