import {useEffect, useState} from "react";
import BasicApi from "../../api/BasicApi";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import AdminAddProductImage from "./AdminAddProductImage";
import AdminDeleteProductImage from "./AdminDeleteProductImage";
import AdminEditProductImage from "./AdminEditProductImage";

const AdminProductDetail = (props) => {
    const [product, setProduct] = useState({
        message: null,
        success: null,
        data: {
            name: props.product.name,
            price: props.product.price,
            discount: props.product.discount,
            description: props.product.description,
            productImages: props.product.productImages,
            categories: props.product.categories
        }
    })

    useEffect(() => {
        fetch(BasicApi.getProductById(props.product.id).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [props.product.id]);

    const [name, setName] = useState(props.product.name)
    const [price, setPrice] = useState(props.product.price)
    const [discount, setDiscount] = useState(props.product.discount)
    const [description, setDescription] = useState(props.product.description)


    const [checked, setChecked] = useState([...props.product.categories.map(ca => ca.id)])

    const handleCheck = (id) => {
        setChecked(prev => {
            if (checked.includes(id)) {
                return checked.filter(item => item !== id)
            }
            return [...prev, id]
        })
    }
    useEffect(() => {
        fetch(AdminApi.editProduct(props.product.id).url, {
            method: AdminApi.editProduct(props.product.id).method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                name: name,
                price: price,
                discount: discount,
                description: description,
                categories: checked.toString()
            })
        })
            .then(resp => resp.json())
            .then(o => {
                    if (o.success === false) {
                        if (o.errorCode === 401) {
                            if (localStorage.getItem('refreshToken') == null) {
                                window.location = Domain + "/login"
                            } else {
                                fetch(BasicApi.refreshToken().url, {
                                    method: BasicApi.refreshToken().method,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
                                    }
                                })
                                    .then(resp => resp.json())
                                    .then(oo => {
                                        if (oo.success === false) {
                                            document.location = window.location = Domain + "/login"
                                        } else {
                                            localStorage.setItem('accessToken', oo.data.accessToken)
                                            localStorage.setItem('refreshToken', oo.data.refreshToken)
                                            AdminProductDetail()
                                        }
                                    })
                            }
                        }
                    }
                }
            )
    }, [name, price, discount, description, checked, props.product.id]);

    const handleAdd = () => {
        fetch(BasicApi.getProductById(props.product.id).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }

    return <>
        <span className="text-primary" data-toggle="modal"
              data-target={`#ChiTietProductAdmin${product.data.id}`}>Chi tiết</span>
        <div className="modal fade" id={`ChiTietProductAdmin${product.data.id}`} tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{name}</h5>
                        <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <ul>
                                            <li><AdminAddProductImage product={product} onReload={handleAdd}/></li>
                                            <li style={{marginTop: 10}}>Mã sản phẩm: <a
                                                href={`/product-detail?id=${product.data.id}`}>{product.data.id}</a>
                                            </li>
                                            <li style={{marginTop: 10}}>
                                                Tên: <input className="form-control" defaultValue={name}
                                                            onChange={e => setName(e.target.value)}/>
                                            </li>
                                            <li style={{marginTop: 10}}>
                                                Giá: <input defaultValue={price}
                                                            onChange={e => setPrice(e.target.value)}/> VND
                                            </li>
                                            <li style={{marginTop: 10}}>
                                                Giảm giá: <input style={{width: 150}}
                                                                 defaultValue={discount}
                                                                 type="number"
                                                                 onChange={e => setDiscount(e.target.value)}/> %
                                            </li>
                                            <li style={{marginTop: 10}}>Giá thực
                                                tế: {(price / 100 * (100 - discount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                            </li>
                                            <li style={{marginTop: 10}}>Mô tả:
                                                <textarea className="form-control" rows="10"
                                                          onChange={e => setDescription(e.target.value)}>{description}</textarea>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-3">
                                        {product.data.productImages.map(pi =>
                                            <div key={pi.id}>
                                                <AdminEditProductImage productImage={pi} onReload={handleAdd}/>
                                                <AdminDeleteProductImage productImage={pi} onReload={handleAdd}/>
                                                <img src={pi.path} className="img-thumbnail"
                                                     alt={product.data.name}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                {props.category.data.map(oo =>
                                    <div key={oo.id}>
                                        <input type="checkbox" checked={checked.includes(oo.id)}
                                               onChange={() => handleCheck(oo.id)}/>
                                        {oo.name}
                                        <br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminProductDetail