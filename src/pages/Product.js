import ProductAll from "../components/ProductAll";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Product = () => {
    document.title = 'Sản phẩm'
    return <>
        <Header/>
        <main>
            <ProductAll/>
        </main>
        <Footer/>
    </>
}
export default Product