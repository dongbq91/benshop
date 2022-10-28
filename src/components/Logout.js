import {useNotification} from "react-hook-notification";
import UserApi from "../api/UserApi";
import Domain from "../api/Domain";
import BasicApi from "../api/BasicApi";

const Logout = () => {

    const notification = useNotification()

    const handleLogout = () => {
        fetch(UserApi.logout().url, {
            method: UserApi.logout().method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
        })
            .then(resp => resp.json())
            .then(o => {
                    if (o.success === false) {
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
                                        handleLogout()
                                    }
                                })
                        }
                    } else {
                        notification.success({text: o.message})
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                    }
                }
            )
    }

    return <a onClick={handleLogout} className="dropdown-item" href="#">
        {localStorage.getItem('accessToken') != null ? 'Đăng xuất' : ''}
    </a>
}
export default Logout