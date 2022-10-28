import {useState} from "react";
import {useNotification} from "react-hook-notification";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";

const CommentAdd = (props) => {

    const [comment, setComment] = useState('')
    const notification = useNotification()

    function handleAddComment() {
        if (comment.length < 1) {
            notification.error({text: 'Không được để trống'})
        } else {
            if (localStorage.getItem('accessToken') == null) {
                window.location = Domain + "/login"
            } else {
                fetch(UserApi.createCommentProduct(props.productId.id).url, {
                    method: UserApi.createCommentProduct(props.productId.id).method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({content: comment, parentId: props.parentId.id}),
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
                                                    handleAddComment()
                                                }
                                            })
                                    }
                                }
                                notification.error({text: o.message})
                            } else {
                                notification.success({text: 'Thêm bình luận thành công'})
                                props.onReload()
                            }
                        }
                    )
            }
        }
    }

    return <>
        <textarea className="form-control" style={{maxWidth: 500, display: "inline"}}
                  onChange={e => setComment(e.target.value)}></textarea>
        <i className="bi bi-send text-primary" style={{marginLeft: 10}} onClick={handleAddComment}/>
    </>
}
export default CommentAdd