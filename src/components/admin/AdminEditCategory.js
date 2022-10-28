import {useEffect, useState} from "react";
import AdminApi from "../../api/AdminApi";
import BasicApi from "../../api/BasicApi";
import Domain from "../../api/Domain";

const AdminEditCategory = (props) => {

    const [category, setCategory] = useState(props.category.name)

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null) {
            fetch(AdminApi.editCategory(props.category.id).url, {
                method: AdminApi.editCategory(props.category.id).method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({name: category})
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
                                                AdminEditCategory(props)
                                            }
                                        })
                                }
                            } else {
                                setCategory(props.category.name)
                            }
                        }
                    }
                )
        } else {
            setCategory(props.category.name)
        }
    }, [category, props]);

    return <input className="form-control" value={category} onChange={e => setCategory(e.target.value)}
                  style={{marginTop: 20}}/>
}
export default AdminEditCategory