import {useNotification} from "react-hook-notification";
import jwt_decode from "jwt-decode";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";
import Domain from "../api/Domain";

const CommentDelete = (props) => {
    const notification = useNotification()

    function handleDelete() {
        if (localStorage.getItem('accessToken') == null) {
            window.location = Domain + "/login"
        } else {
            fetch(UserApi.deleteProductComment(props.comment.id).url, {
                method: UserApi.deleteProductComment(props.comment.id).method,
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
                                                localStorage.setItem('accessToken', JSON.stringify(oo.data.accessToken))
                                                localStorage.setItem('refreshToken', JSON.stringify(oo.data.refreshToken))
                                                handleDelete()
                                            }
                                        })
                                }
                            }
                            notification.error({text: o.message})
                        } else {
                            notification.success({text: 'Xóa bình luận thành công'})
                            props.onReload()
                        }
                    }
                )
        }
    }

    return <>{localStorage.getItem('accessToken')!=null?(jwt_decode(localStorage.getItem('accessToken')).sub === props.comment.createdBy ?
        <span className="text-danger" style={{marginTop: -5}} onClick={handleDelete}>Xóa</span> : ''):''}
    </>
}

export default CommentDelete