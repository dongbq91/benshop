import jwt_decode from "jwt-decode";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";
import {useNotification} from "react-hook-notification";

const AdminDeleteNote = (props) => {

    const notification = useNotification()

    function handleDelete() {
        if (localStorage.getItem('accessToken') != null) {
            fetch(AdminApi.deleteNote(props.note.id).url, {
                method: AdminApi.deleteNote(props.note.id).method,
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
                                                window.location = Domain + "/login"
                                            } else {
                                                localStorage.setItem('accessToken', oo.data.accessToken)
                                                localStorage.setItem('refreshToken', oo.data.refreshToken)
                                                handleDelete()
                                            }
                                        })
                                }
                            }
                            notification.success({text: o.message})
                        } else {
                            notification.success({text: 'Xóa ghi chú thành công'})
                            props.onReload()
                        }
                    }
                )
        } else {
            window.location = Domain + "/login"
        }
    }

    return <>
        {jwt_decode(localStorage.getItem('accessToken')).sub === props.note.createdBy ?
            <i className="bi bi-trash2-fill text-danger" onClick={handleDelete}/> : ''}
    </>
}
export default AdminDeleteNote