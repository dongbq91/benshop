import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";
import {Link} from "react-router-dom";
import '../assets/css/Slide.css'

const Slide = () => {

    const [product, setProduct] = useState({message: null, success: null, data: {content: []}})

    useEffect(() => {
        fetch(BasicApi.searchProduct('sort=discount:desc&size=3').url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, []);

    return <div style={{marginTop: 82}} className="row">
        <div id="carouselExampleCaptions" className="carousel slide col-12" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner" style={{maxHeight: 500}}>
                {product.data.content.filter((o, i) => i === 0).map((o) =>
                    <div key={o.id} className="carousel-item active">
                        <Link to={`/product-detail?id=${o.id}`}>
                            <img style={{maxHeight: 500}}
                                 src={o.productImages[1].path} className="d-block w-100 "
                                 alt={o.name}/>
                            <div className="carousel-caption d-none d-md-block">
                                <p style={{fontSize: "300%", fontWeight: "bold",color: "red"}}
                                   className="text-left blink_me">Giảm {o.discount}%</p>
                                <p style={{fontSize: "150%", fontWeight: "bold",color: "red"}}>{o.name}</p>
                            </div>
                        </Link>
                    </div>
                )}
                {product.data.content.filter((o, i) => i !== 0).map((o) =>
                    <div key={o.id} className="carousel-item">
                        <Link to={`/product-detail?id=${o.id}`}>
                            <img style={{maxHeight: 500}}
                                 src={o.productImages[1].path} className="d-block w-100 "
                                 alt={o.name}/>
                            <div className="carousel-caption d-none d-md-block">
                                <p style={{fontSize: "300%", fontWeight: "bold",color: "red"}}
                                   className="text-left blink_me">Giảm {o.discount}%</p>
                                <p style={{fontSize: "150%", fontWeight: "bold",color: "red"}}>{o.name}</p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions"
                    data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions"
                    data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </button>
        </div>
    </div>
}
export default Slide