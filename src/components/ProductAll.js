import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import {Link, useLocation} from "react-router-dom";
import '../assets/css/ProductAll.css'
import ProductCard from "./ProductCard";

const ProductNew = () => {
    const [product, setProduct] = useState({message: null, success: null, data: {content: [], totalPages: null}})
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [filterPriceMax, setFilterPriceMax] = useState(10000000)
    const [filterPriceMin, setFilterPriceMin] = useState(0)
    const [arrowPrice, setArrowPrice] = useState('price:asc')

    let pages = []
    let categoryId = ''
    let location = useLocation()
    if (location.search !== '') {
        categoryId = location.search.split('=')[1]
    }

    useEffect(() => {
        fetch(BasicApi.searchProduct(
            `size=4&categoryId=${categoryId}&page=${page}&search=${search}&priceMax=${filterPriceMax}&priceMin=${filterPriceMin}&sort=${arrowPrice},id:desc`).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [categoryId, page, search, filterPriceMax, filterPriceMin, arrowPrice]);

    for (let i = 0; i < product.data.totalPages; i++) {
        pages.push(i)
    }

    return <>
        <p style={{marginTop: 120}} className="text-warning">
            <Link to="/">Trang chủ</Link>/Sản phẩm
        </p>
        <div className="row">
            <div className="col-md-3">

                <input className="form-control border-success" style={{marginTop: 10}} type="text"
                       placeholder="Tìm kiếm" onChange={e => setSearch(e.target.value)}/>

                <label style={{marginTop: 10}} htmlFor="customRange1">Giá cao nhất</label>
                <input type="range" className="custom-range" min="0" max="10000000" step="100000" id="customRange1"
                       onChange={e => setFilterPriceMax(e.target.value)}/><sup
                style={{float: "right"}}>{filterPriceMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</sup>
                <label htmlFor="customRange2">Giá thấp nhất</label>
                <input type="range" className="custom-range" min="0" max="10000000" step="100000" id="customRange2"
                       onChange={e => setFilterPriceMin(e.target.value)}/><sup
                style={{float: "right"}}>{filterPriceMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</sup>

                <label style={{marginTop: 10}}>Giá</label>
                <input style={{marginLeft: 20}} type="radio" name="szGia" value="price:asc"
                       onChange={e => setArrowPrice(e.target.value)}/>
                <i className="bi bi-arrow-up text-success"/>
                <input style={{marginLeft: 20}} type="radio" name="szGia" value="price:desc"
                       onChange={e => setArrowPrice(e.target.value)}/>
                <i className="bi bi-arrow-down text-danger"/><br/>
            </div>
            <div className="col-md-9">
                <div className="row">
                    {product.data.content.map(o =>
                        <div key={o.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <ProductCard product={o}/>
                        </div>
                    )}
                </div>
                <div style={{width: 350, margin: "20px auto 0 auto"}}>
                    {pages.map(o =>
                        <input className="btn border border-success page__hover" key={o} type="button" value={o}
                               onClick={(e) => setPage(e.target.value)}/>)}
                </div>
            </div>
        </div>
    </>
}
export default ProductNew