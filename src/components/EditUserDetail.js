import { useNotification } from "react-hook-notification";
import { useEffect, useState } from "react";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";
import Header from "./Header";
import Footer from "./Footer";

const EditUserDetail = () => {
    const notification = useNotification();
    const [user, setUser] = useState({ message: null, success: null, data: [] })

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState(user.data.gender)

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
                                        EditUserDetail()
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
        if (firstName.length < 1 || firstName.length > 50) {
            notification.error({
                text: "First name tối thiểu 1 ký tự, tối đa 50 ký tự"
            })
        }
        if (lastName.length < 1 || lastName.length > 50) {
            notification.error({
                text: "Last name tối thiểu 1 ký tự, tối đa 50 ký tự"
            })
        }
        if (document.getElementById("MALE").checked === false && document.getElementById("FEMALE").checked === false) {
            notification.error({
                text: "Chọn Giới tính Nam / Nữ"
            })
        }
        else if (firstName.length >= 1
            && firstName.length <= 50
            && lastName.length >= 1
            && lastName.length <= 50
            && document.getElementById("MALE").checked === true
            || document.getElementById("FEMALE").checked === true
        ) {
            fetch(UserApi.editCurrentUser().url, {
                method: UserApi.editCurrentUser().method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender
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
                                        EditUserDetail()
                                    }
                                })
                        }
                    } else {
                        if (o.success === false) {
                            notification.error({
                                text: o.message
                            })
                        } else {
                            notification.success({
                                text: o.message
                            })
                            setUser(o)
                        }
                    }
                })
        }
    }

    return <>
        <Header />
        <main style={{ marginTop: 120, minHeight: 500 }}>
            <div style={{ width: 600, margin: "auto" }}>
                <h4>Thông tin cập nhật</h4>
            </div>
            <div style={{ width: 350, margin: "auto" }}>
                <label htmlFor="name" style={{ marginTop: 20 }}>First Name</label>
                <input type="text" id="name" className="form-control"
                    placeholder="First Name" onChange={e => setFirstName(e.target.value)} />

                <label htmlFor="name" style={{ marginTop: 20 }}>Last Name</label>
                <input type="text" id="name" className="form-control"
                    placeholder="Last Name" onChange={e => setLastName(e.target.value)} />

                <label htmlFor="gender" style={{ marginTop: 20 }}>Giới tính</label><br />
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" id="MALE" name="optradio"
                            value="MALE" onChange={e => setGender(e.target.value)} />Nam &emsp;&emsp;
                    </label>
                </div>
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" id="FEMALE" name="optradio"
                            value="FEMALE" onChange={e => setGender(e.target.value)} />Nữ
                    </label>
                </div>
                <div style={{ width: 104, margin: "auto", marginTop: 40 }}>
                    <button className="btn btn-primary" onClick={handleEdit}>Cập nhật</button>
                </div>
            </div>
        </main>
        <Footer />
    </>
}
export default EditUserDetail