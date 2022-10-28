import Slide from "../components/Slide";
import ProductNew from "../components/ProductNew";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    document.title = 'Trang chủ'
    return <>
        <Header/>
        <main style={{minHeight: "auto"}}>
            <Slide/>
            <ProductNew/>
        </main>
        <Footer/>
    </>
}
export default Home