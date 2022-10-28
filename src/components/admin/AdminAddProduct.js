import {useState} from "react";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";
import {useNotification} from "react-hook-notification";

const AdminAddProduct = (props) => {
    const notification = useNotification()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [description, setDescription] = useState('')
    const [checked, setChecked] = useState([])

    const handleCheck = (id) => {
        setChecked(prev => {
            if (checked.includes(id)) {
                return checked.filter(item => item !== id)
            }
            return [...prev, id]
        })
    }

    const submit = () => {
        if (name.length < 1) {
            notification.error({text: "Tên sản phẩm không được để trống"})
        } else if (checked.length < 1) {
            notification.error({text: "Chưa chọn danh mục của sản phẩm"})
        } else {
            fetch(AdminApi.addProduct().url, {
                method: AdminApi.addProduct().method,
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
                                                AdminAddProduct()
                                            }
                                        })
                                }
                            }
                            notification.error({text: o.message})
                        } else {
                            notification.success({text: 'Thêm sản phẩm thành công'})
                            props.onReload()
                        }
                    }
                )
        }
    }

    return <>
        <button className="btn- btn-success" data-toggle="modal" data-target={`#themProduct`}>
            Thêm sản phẩm
        </button>
        <div className="modal fade bg-secondary" id={`themProduct`} tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-9">
                                <ul>
                                    <li style={{marginTop: 10}}>
                                        Tên: <input className="form-control" defaultValue={name}
                                                    onChange={e => setName(e.target.value)}/>
                                    </li>
                                    <li style={{marginTop: 10}}>
                                        Giá: <input defaultValue={price} type="number"
                                                    onChange={e => setPrice(e.target.value)}/> VND
                                    </li>
                                    <li style={{marginTop: 10}}>
                                        Giảm giá: <input style={{width: 150}} type="number" defaultValue={discount}
                                                         onChange={e => setDiscount(e.target.value)}/> %
                                    </li>
                                    <li style={{marginTop: 10}}>Giá thực
                                        tế: {(price * (100 - discount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                    </li>
                                    <li style={{marginTop: 10}}>Mô tả:
                                        <textarea className="form-control" rows="10"
                                                  onChange={e => setDescription(e.target.value)}>{description}</textarea>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                {props.category.data.map(oo =>
                                    <div key={oo.id}>
                                        <input type="checkbox" checked={checked.includes(oo.id)}
                                               onChange={() => handleCheck(oo.id)}/>{oo.name}
                                        <br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={submit}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminAddProduct