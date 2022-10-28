import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";
import {useNotification} from "react-hook-notification";

const AdminDeleteCategory = (props) => {

    const notification = useNotification()

    const handleDelete = () => {
        fetch(AdminApi.deleteCategory(props.category.id).url, {
            method: AdminApi.deleteCategory(props.category.id).method,
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
                                            handleDelete()
                                        }
                                    })
                            }
                        }
                        notification.error({text: o.message})
                    } else {
                        notification.success({text: 'Xóa danh mục thành công'})
                        props.onReload()
                    }
                }
            )
    }

    return <i className="bi bi-trash3-fill text-danger" onClick={handleDelete} style={{marginLeft: 30}}>
    </i>

}
export default AdminDeleteCategory