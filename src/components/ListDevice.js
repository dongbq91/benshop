import {useNotification} from "react-hook-notification";
import {useEffect, useState} from "react";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";
import Header from "./Header";
import Footer from "./Footer";

const ListDevice = () => {
    const notification = useNotification()
    const [user, setUser] = useState({message: null, success: null, data: {devices: []}})
    const [checked, setChecked] = useState([])

    const handleCheck = (id) => {
        setChecked(prev => {
            if (checked.includes(id)) {
                return checked.filter(item => item !== id)
            }
            return [...prev, id]
        })
    }

    if (localStorage.getItem('accessToken') == null) {
        window.location = Domain + "/login"
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            fetch(UserApi.getCurrentUser().url, {
                method: UserApi.getCurrentUser().method,
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
                                            ListDevice()
                                        }
                                    })
                            }
                        } else {
                            setUser(o)
                        }
                    }
                )
        }, []);
    }

    const Reload = () => {
        fetch(UserApi.getCurrentUser().url, {
            method: UserApi.getCurrentUser().method,
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
                                        ListDevice()
                                    }
                                })
                        }
                    } else {
                        setUser(o)
                    }
                }
            )
    }

    const handleLogout = () => {
        fetch(UserApi.logouts(checked.toString()).url, {
            method: UserApi.logouts(checked.toString()).method,
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
                        Reload()
                    }
                }
            )
    }

    return <>
        <Header/>
        <main style={{marginTop: 120, minHeight: 500}}>
            <div style={{width: 600, margin: "auto"}}>
                <h4>Danh sách thiết bị đang đăng nhập</h4>
            </div>
            <div className="col-md-9" style={{width: 350, margin: "auto", marginTop: 40}}>
                <div className="row">
                    {user.data.devices.map(o =>
                        <div key={o.id} className="col-12">
                            <div className="row" style={{alignItems: "center"}}>
                                <div className="col-sm">
                                    <input type="checkbox" style={{width: 20, height: 20}}
                                           checked={checked.includes(o.id)}
                                           onChange={() => handleCheck(o.id)}/>
                                </div>
                                <div className="col-sm-10">
                                    <label htmlFor="userAgent">Thiết
                                        bị {navigator.userAgent === o.userAgent ? 'hiện tại' : ''}</label>&emsp;&emsp;
                                    <input type="text" id="userAgent" className="form-control"
                                           placeholder="UserAgent" value={o.userAgent}/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )}
                </div>
            </div>
            <div style={{width: 100, margin: "auto"}}>
                <button className="btn btn-primary" onClick={handleLogout}>Đăng xuất</button>
            </div>

        </main>
        <Footer/>
    </>
}
export default ListDevice