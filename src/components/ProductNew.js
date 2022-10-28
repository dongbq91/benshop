import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import ProductCard from "./ProductCard";

const ProductNew = () => {

    const [product, setProduct] = useState({message: null, success: null, data: {content: []}})
    const [page, setPage] = useState(0)
    let pages = []

    useEffect(() => {
        fetch(BasicApi.searchProduct(`sort=id:desc&size=6&page=${page}`).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [page]);

    for (let i = 0; i < product.data.totalPages; i++) {
        pages.push(i)
    }

    return <>
        <h3 className="text-warning" style={{marginTop: 20}}>Sản phẩm mới</h3>
        <hr/>
        <div className="row">
            {product.data.content.map(o =>
                <div key={o.id} className="col-12 col-md-4 col-xl-2 col-lg-3 col-sm-6">
                    <ProductCard product={o}/>
                </div>
            )}
        </div>
        <div style={{width: 350, margin: "20px auto 0 auto"}}>
            {pages.map(o =>
                <input className="btn border border-success page__hover" key={o} type="button" value={o}
                       onClick={(e) => setPage(e.target.value)}/>)}
        </div>
    </>
}
export default ProductNew