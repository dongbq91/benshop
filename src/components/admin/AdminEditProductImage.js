import {useState} from "react";
import {useNotification} from "react-hook-notification";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import BasicApi from "../../api/BasicApi";

const AdminEditProductImage = (props) => {
    const [image, setImage] = useState()
    const notification = useNotification()

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    };

    const editImage = () => {
        if (image == null) {
            notification.error({text: 'Chưa chọn ảnh'})
        } else {
            const formData = new FormData()
            formData.append('image', image);
            fetch(AdminApi.editProductImage(props.productImage.id).url, {
                method: AdminApi.editProductImage(props.productImage.id).method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: formData
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
                                                AdminEditProductImage(props)
                                            }
                                        })
                                }
                            } else {
                                notification.error({text: o.message})
                            }
                        } else {
                            notification.success({text: 'Sửa ảnh sản phẩm thành công'})
                            props.onReload()
                        }
                    }
                )
        }
    }

    return <>
        <i className="bi bi-pencil-fill text-warning" data-toggle="modal"
           data-target={`#suaAnh${props.productImage.id}`}/>
        <div className="modal fade bg-secondary" id={`suaAnh${props.productImage.id}`} tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="file" onChange={changeHandler}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={editImage}>Sửa</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminEditProductImage