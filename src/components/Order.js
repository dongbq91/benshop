import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import {useNotification} from "react-hook-notification";
import BasicApi from "../api/BasicApi";

const Order = () => {
    const notification = useNotification();

    const handleOrder = () => {
        if (localStorage.getItem('accessToken') == null) {
            window.location = Domain + "/login"
        } else {
            fetch(UserApi.createOrder().url, {
                method: UserApi.createOrder().method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    orderDetails: JSON.parse(localStorage.getItem('storage')).map(a => {
                        return {
                            id: a.id,
                            description: a.description,
                            quantity: a.quantity
                        }
                    })
                }),
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
                                                localStorage.setItem('accessToken', JSON.stringify(oo.data.accessToken))
                                                localStorage.setItem('refreshToken', JSON.stringify(oo.data.refreshToken))
                                                handleOrder()
                                            }
                                        })
                                }
                            } else {
                                notification.error({
                                    text: o.message
                                })
                            }
                        } else {
                            localStorage.removeItem('storage')
                            notification.success({
                                text: o.message
                            })
                        }
                    }
                )
        }
    }
    return <button onClick={handleOrder} className="btn btn-success">
        Đặt hàng
    </button>
}
export default Order