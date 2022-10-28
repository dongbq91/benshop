import {useNotification} from "react-hook-notification";
import {useState} from "react";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";

const AdminAddCategory = (props) => {

    const notification = useNotification()
    const [category, setCategory] = useState('')

    const handleAdd = () => {
        if (category.length < 1) {
            notification.error({text: 'Không được để trống'})
        } else {
            fetch(AdminApi.addCategory().url, {
                method: AdminApi.addCategory().method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({name: category, parentId: props.category.id})
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
                                                handleAdd()
                                            }
                                        })
                                }
                            }
                            notification.error({text: o.message})
                        } else {
                            notification.success({text: 'Thêm danh mục thành công'})
                            props.onReload()
                        }
                    }
                )
        }
    }

    return <>
        <i className="bi bi-plus-square-fill text-success" data-toggle="modal"
           data-target={`#addCategory${props.category.id}`}/>

        <div className="modal fade" id={`addCategory${props.category.id}`} data-backdrop="static" data-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Thêm danh mục</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" onChange={e => setCategory(e.target.value)}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={handleAdd}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminAddCategory