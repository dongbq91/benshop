import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";
import AddToCart from "./AddToCart";
import Comment from "./Comment";
import ProductPropose from "./ProductPropose";

const ProductDetail = () => {
    const [product, setProduct] = useState({message: null, success: null, data: {productImages: [{path: null}]}})
    const [path, setPath] = useState('')
    let productId = ''
    let location = useLocation()
    if (location.search !== '') {
        productId = location.search.split('=')[1]
    } else {
        window.location = Domain + "/product"
    }

    useEffect(() => {
        fetch(BasicApi.getProductById(productId).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [productId]);


    document.title = product.data.name

    return <>
        <p style={{marginTop: 120}} className="text-warning">
            <Link to="/">Trang chủ</Link>/<Link to="/product">Sản phẩm</Link>/Chi tiết
        </p>
        <div className="row">
            <div className="col-md-6 border-right">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="row">
                            {product.data.productImages.map(o =>
                                <div key={o.id} className="col-12">
                                    <img onMouseMove={() => setPath(o.path)} className="img-fluid border"
                                         src={o.path} alt={o.name}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <img style={{maxHeight: 500}} className="img-fluid"
                             src={path || product.data.productImages[0].path}
                             alt={product.data.productImages[0].name}/>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <AddToCart product={product}/>
            </div>
            <div className="col-12 border-top">
                <h3 style={{marginTop: 20}}>Chi tiết sản phẩm</h3>
                {product.data.description || `Đang cập nhật ...`}
            </div>
            <div className="col-12 border-top">
                <ProductPropose productId={{id: productId}}/>
            </div>
            <div className="col-12">
                <Comment productId={{id: productId}}/>
            </div>
        </div>
    </>
}
export default ProductDetail