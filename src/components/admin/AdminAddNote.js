import {useNotification} from "react-hook-notification";
import {useState} from "react";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";

const AdminAddNote = (props) => {
    const notification = useNotification()
    const [note, setNote] = useState('')

    function addNote() {
        if (note.length < 1) {
            notification.error({text: 'Không được để trống'})
        } else {
            if (localStorage.getItem('accessToken') != null) {
                fetch(AdminApi.addNote(props.orderDetail.id).url, {
                    method: AdminApi.addNote(props.orderDetail.id).method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({content: note})
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
                                                    addNote()
                                                }
                                            })
                                    }
                                }
                                notification.success({text: o.message})
                            } else {
                                notification.success({text: 'Thêm ghi chú thành công'})
                                props.onReload()
                            }
                        }
                    )
            } else {
                window.location = Domain + "/login"
            }
        }
    }

    return <>
        <i className="bi bi-plus-circle text-success" data-toggle="modal"
           data-target={`#addNote${props.orderDetail.id}`}/>

        <div className="modal fade bg-secondary" id={`addNote${props.orderDetail.id}`} tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thêm ghi chú cho mã sản
                            phẩm: {props.orderDetail.product.id}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <textarea className="form-control" rows={10} onChange={e => setNote(e.target.value)}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={addNote}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminAddNote