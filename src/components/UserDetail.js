import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Domain from "../api/Domain";
import UserApi from "../api/UserApi";
import BasicApi from "../api/BasicApi";
import Header from "./Header";
import Footer from "./Footer";

const UserDetail = () => {
    const [user, setUser] = useState({ message: null, success: null, data: [] })

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
                                        UserDetail()
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
    const changeGender = () => {
        if (user.data.gender === "MALE") {
            return "Nam"
        }
        else if (user.data.gender === "FEMALE") {
            return "Nữ"
        }
    }

    return <>
        <Header />
        <main style={{ marginTop: 120, minHeight: 500 }}>
            <div style={{ width: 600, margin: "auto" }}>
                <h4>Thông tin tài khoản</h4>
            </div>
            <div style={{ width: 350, margin: "auto" }}>
                <label htmlFor="username" style={{ marginTop: 20 }}>Tài khoản</label>
                <input type="text" id="username" className="form-control"
                    placeholder="Username" value={user.data.username} />

                <label htmlFor="email" style={{ marginTop: 20 }}>Email</label>
                <input type="text" id="email" className="form-control"
                    placeholder="Email" value={user.data.email} />

                <label htmlFor="name" style={{ marginTop: 20 }}>Họ và tên</label>
                <input type="text" id="name" className="form-control"
                    placeholder="Name" value={user.data.firstName + " " + user.data.lastName} />

                <label htmlFor="gender" style={{ marginTop: 20 }}>Giới tính</label>
                <input type="text" id="gender" className="form-control"
                    placeholder="" value={changeGender()} />
            </div>
            <div style={{ width: 165, margin: "auto", marginTop: 40 }}>
                <Link className="btn btn-primary" to="/user/edit-user-detail">Cập nhật thông tin</Link>
            </div>
        </main>
        <Footer />
    </>
}
export default UserDetail