import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";
import {useNotification} from "react-hook-notification";

const AdminDeleteProductImage = (props) => {

    const notification = useNotification()

    const handleDelete = () => {
        fetch(AdminApi.deleteProductImage(props.productImage.id).url, {
            method: AdminApi.deleteProductImage(props.productImage.id).method,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(resp => resp.json())
            .then(o => {
                    console.log(o.message)
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
                                            handleDelete()
                                        }
                                    })
                            }
                        } else {
                            notification.error({text: o.message})
                        }
                    } else {
                        notification.success({text: 'Xóa ảnh sản phẩm thành công'})
                        props.onReload()
                    }
                }
            )
    }

    return <i className="bi bi-trash2-fill text-danger" style={{marginLeft: 20}} onClick={handleDelete}/>
}
export default AdminDeleteProductImage