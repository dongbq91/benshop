import {useEffect, useState} from "react";
import UserApi from "../api/UserApi";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";
import jwt_decode from "jwt-decode";

const EditOrderDetailNote = (props) => {

    const [note, setNote] = useState(props.orderDetailNote.content)

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null
            && jwt_decode(localStorage.getItem('accessToken')).sub === props.orderDetailNote.createdBy) {

            fetch(UserApi.editOrderDetailNote(props.orderDetailNote.id).url, {
                method: UserApi.editOrderDetailNote(props.orderDetailNote.id).method,
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
                                                document.location = window.location = Domain + "/login"
                                            } else {
                                                localStorage.setItem('accessToken', oo.data.accessToken)
                                                localStorage.setItem('refreshToken', oo.data.refreshToken)
                                            }
                                        })
                                }
                            } else {
                                setNote(props.orderDetailNote.content)
                            }
                        }
                    }
                )
        } else {
            setNote(props.orderDetailNote.content)
        }
    }, [note]);

    return <textarea className="form-control" value={note} onChange={e => setNote(e.target.value)}>
        {note}
    </textarea>
}
export default EditOrderDetailNote