import {Link} from "react-router-dom";
import moment from "moment";

const ProductCard = (props) => {
    return <Link to={`/product-detail?id=${props.product.id}`}>
        <img src={props.product.productImages[0].path} className="card-img-top" alt={props.product.name}/>
        <div className="card-body card">
            <h5 className="card-title text-truncate">{props.product.name}</h5>
            <p className="card-text text-center text-truncate text-secondary">
                <del>{props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del>
                VND
            </p>
            <p className="card-text text-center text-truncate text-danger">
                {props.product.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </p>
            {/*<p className="card-text text-center">*/}
            {/*    <small className="text-muted">*/}
            {/*        {moment(props.product.updatedDate).fromNow()}*/}
            {/*    </small>*/}
            {/*</p>*/}
        </div>
    </Link>
}
export default ProductCard