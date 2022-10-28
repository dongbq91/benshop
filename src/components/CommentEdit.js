import jwt_decode from "jwt-decode";
import {useState} from "react";
import {useNotification} from "react-hook-notification";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";

const CommentEdit = (props) => {
    const [comment, setComment] = useState('')
    const notification = useNotification()

    function handleEdit() {
        if (comment.length < 1) {
            notification.error({text: 'Không được để trống'})
        } else {
            if (localStorage.getItem('accessToken') == null) {
                window.location = Domain + "/login"
            } else {
                fetch(UserApi.editProductComment(props.comment.id).url, {
                    method: UserApi.editProductComment(props.comment.id).method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({content: comment}),
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
                                                    handleEdit()
                                                }
                                            })
                                    }
                                }
                                notification.error({text: o.message})
                            } else {
                                notification.success({text: 'Sửa bình luận thành công'})
                                props.onReload()
                            }
                        }
                    )
            }
        }
    }

    return <>
        {localStorage.getItem('accessToken')!=null?(jwt_decode(localStorage.getItem('accessToken')).sub === props.comment.createdBy ?
            <span style={{marginLeft: 10}} className="text-warning" data-toggle="modal"
                  data-target={`#suaComment${props.comment.id}`}>Sửa</span> : ''):''}

        <div className="modal fade" id={`suaComment${props.comment.id}`} tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Sửa bình luận</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <textarea className="form-control" onChange={e => setComment(e.target.value)}
                                  defaultValue={props.comment.content}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleEdit}>Sửa</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default CommentEdit