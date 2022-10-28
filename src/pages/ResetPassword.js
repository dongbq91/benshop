import {useNotification} from "react-hook-notification";
import {useState} from "react";
import BasicApi from "../api/BasicApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

const ResetPassword = () => {
    const notification = useNotification();
    const [username, setUsername] = useState('')
    document.title='Đặt lại mật khẩu'

    function handleLogin() {
        if (username.length < 1) {
            notification.error({
                text: 'Không được để trống thông tin'
            })
        } else if (username.length >= 1) {
            fetch(BasicApi.resetPassword().url, {
                method: BasicApi.resetPassword().method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username})
            })
                .then(resp => resp.json())
                .then(o => {
                    console.log(o.message)
                    if (o.success === false) {
                        notification.error({
                            text: o.message
                        })
                    } else {
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')

                        notification.success({
                            text: o.message
                        })
                    }
                })
        }
    }

    return <>
        <Header/>
        <main style={{marginTop: 120, minHeight: 500}}>
            <div style={{width: 350, margin: "auto"}}>
                <input onChange={e => setUsername(e.target.value)} type="text" className="form-control"
                       placeholder="Nhập tài username hoặc email"/>
            </div>
            <div style={{width: 142, margin: "auto", marginTop: 40}}>
                <button onClick={handleLogin} className="btn btn-primary">Đặt lại mật khẩu</button>
            </div>
            <div style={{width: 350, margin: "auto", marginTop: 40}}>
                <Link to="/login" style={{float: "left"}}>Đăng nhập</Link>
                <Link to="/register" style={{float: "right"}}>Đăng ký</Link>
            </div>
        </main>
        <Footer/>
    </>
}
export default ResetPassword