import {useState} from "react";
import {useNotification} from 'react-hook-notification';

const AddToCart = (props) => {

    const [soLuong, setSoLuong] = useState(1)
    const [yeuCau, setYeuCau] = useState('')

    const notification = useNotification();

    let price = props.product.data.price + ''
    let money = props.product.data.money + ''

    let test = localStorage.getItem('storage')
    let storage = []
    if (test != null) {
        storage = JSON.parse(test)
    }

    const validate_ = () => {
        if (soLuong < 1) {
            notification.error({
                text: 'Số lượng tối thiểu 1'
            })
        }
        if (soLuong > 1000) {
            notification.error({
                text: 'Số lượng tối đa 1000'
            })
        }
        if (yeuCau.length === 0) {
            notification.error({
                text: 'Vui lòng nhập yêu cầu'
            })
        }
        if (yeuCau.length > 1000) {
            notification.error({
                text: 'Yêu cầu nhập tối đa 1000 ký tự'
            })
        }
        if (soLuong >= 1 && soLuong <= 1000 && yeuCau.length > 0 && yeuCau.length <= 1000) {
            storage.push({
                id: props.product.data.id
                , name: props.product.data.name
                , image: props.product.data.productImages[0].path
                , money: props.product.data.money
                , quantity: soLuong
                , description: yeuCau
            })
            localStorage.setItem('storage', JSON.stringify(storage))
            notification.success({
                text: 'Thêm vào giỏ hàng thành công'
            })
        }
    }

    return <>
        <h2>{props.product.data.name}</h2>
        <p>Mã sản phẩm: {props.product.data.id}</p>
        <p>
            <del
                className="text-secondary">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </del>
            VND
        </p>
        <h3 className="text-danger">{money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</h3>
        <label htmlFor="soLuong" style={{marginTop: 20}}>Số lượng</label><br/>
        <input onChange={e => setSoLuong(e.target.value)} id="soLuong" type="number" value={soLuong}
               className="form-control" style={{maxWidth: 100, display: "inline"}} min="1" max="1000"/>
        <button onClick={validate_} style={{margin: "-5px 0 0 5px"}} className="btn btn-success">
            <i className="bi bi-cart-plus"/>
        </button>
        <br/>
        <label htmlFor="yeuCau" style={{marginTop: 20}}>Yêu cầu</label>
        <textarea className="form-control" rows="10" onChange={e => setYeuCau(e.target.value)}
                  placeholder="Nhập địa chỉ, chiều cao, cân nặng của bạn vào đây nhé. Những yêu cầu của bạn, chất liệu thay đổi, thêu, in ấn tên, logo. Có thể gửi link ảnh ở mục này nhé"/>
    </>
}
export default AddToCart