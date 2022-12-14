import { useNotification } from "react-hook-notification";
import { useEffect, useState } from "react";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";
import Header from "./Header";
import Footer from "./Footer";

const EditUserEmail = () => {
    const notification = useNotification();
    const [user, setUser] = useState({ message: null, success: null, data: [] })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordLatest, setPasswordLatest] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                                        EditUserEmail()
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

    const handleEdit = () => {
        if (password.length < 1) {
            notification.error({
                text: "M???t kh???u kh??ng ???????c ????? tr???ng"
            })
        }
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/.test(passwordLatest) === false || passwordLatest.length > 16) {
            notification.error({
                text: 'M???t kh???u m???i ph???i ch???a k?? t??? ?????c bi???t, a-z, A-Z, 0-9, t???i thi???u 8 k?? t???, t???i ??a 16 k?? t???'
            })
        }
        if (email.length > 50 || /^\w{1,}([\.-]{0,1}\w{1,}){0,}@\w{1,}([\.-]{0,1}\w{1,}){0,}(\.\w{2,3}){1,}$/.test(email) === false) {
            notification.error({
                text: 'Ph???i nh???p ????ng d???ng email, t???i ??a 50 k?? t???'
            })
        }
        if (passwordLatest !== confirmPassword) {
            notification.error({
                text: 'M???t kh???u x??c nh???n kh??ng kh???p'
            })
        }
        else if (email.length <= 50
            && /^\w{1,}([\.-]{0,1}\w{1,}){0,}@\w{1,}([\.-]{0,1}\w{1,}){0,}(\.\w{2,3}){1,}$/.test(email)
            && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/.test(passwordLatest)
            && passwordLatest.length <= 16
            && passwordLatest === confirmPassword
        ) {
            fetch(UserApi.editPasswordOrMail().url, {
                method: UserApi.editPasswordOrMail().method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    password: password,
                    passwordLatest: passwordLatest,
                    email: email
                })
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
                                        EditUserEmail()
                                    }
                                })
                        }
                        notification.error({
                            text: o.message
                        })
                    } else {
                        notification.success({
                            text: "C???p nh???t password, email th??nh c??ng"
                        })
                        setUser(o)
                    }
                })
        }
    }

    return <>
        <Header />
        <main style={{ marginTop: 120, minHeight: 500 }}>
            <div style={{ width: 600, margin: "auto" }}>
                <h4>Th??ng tin c???p nh???t</h4>
            </div>
            <div style={{ width: 350, margin: "auto" }}>

                <label htmlFor="password" style={{ marginTop: 20 }}>Password</label>
                <input type="password" id="password" className="form-control"
                    placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <label htmlFor="passwordLatest" style={{ marginTop: 20 }}>NewPassword</label>
                <input type="password" id="passwordLatest" className="form-control"
                    placeholder="NewPassword" onChange={e => setPasswordLatest(e.target.value)} />

                <label htmlFor="confirmPassword" style={{ marginTop: 20 }}>ConfirmPassword</label>
                <input type="password" id="confirmPassword" className="form-control"
                    placeholder="ConfirmPassword" onChange={e => setConfirmPassword(e.target.value)} />

                <label htmlFor="email" style={{ marginTop: 20 }}>Email</label>
                <input type="text" id="email" className="form-control"
                    placeholder="Email" onChange={e => setEmail(e.target.value)} />

            </div>
            <div style={{ width: 100, margin: "auto", marginTop: 40 }}>
                <button className="btn btn-primary" onClick={handleEdit}>C???p nh???t</button>
            </div>
        </main>
        <Footer />
    </>
}
export default EditUserEmail