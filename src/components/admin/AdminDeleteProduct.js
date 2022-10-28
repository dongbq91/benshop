import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";
import {useNotification} from "react-hook-notification";

const AdminDeleteProduct = (props) => {
    const notification = useNotification()

    const deleteProduct = () => {
        fetch(AdminApi.deleteProduct(props.product.id).url, {
            method: AdminApi.deleteProduct(props.product.id).method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
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
                                            AdminDeleteProduct()
                                        }
                                    })
                            }
                        }
                        notification.error({text: o.message})
                    } else {
                        notification.success({text: 'Xóa sản phẩm thành công'})
                        props.onReload()
                    }
                }
            )
    }

    return <>
        <span style={{marginLeft: 20}} className="text-danger" data-toggle="modal"
              data-target={`#xoaProductAdmin${props.product.id}`} onClick={deleteProduct}>Xóa</span>
    </>
}
export default AdminDeleteProduct