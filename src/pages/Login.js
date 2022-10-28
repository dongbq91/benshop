import {useNotification} from "react-hook-notification";
import {useState} from "react";
import BasicApi from "../api/BasicApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

const Login = () => {
    document.title = 'Đăng nhập'
    const notification = useNotification();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        if (username.length < 1) {
            notification.error({
                text: 'Tài khoản không được để trống'
            })
        }
        if (password.length < 1) {
            notification.error({
                text: 'Mật khẩu không được để trống'
            })
        } else if (username.length >= 1 && password.length >= 1) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            fetch(BasicApi.login().url, {
                method: BasicApi.login().method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})
            })
                .then(resp => resp.json())
                .then(o => {
                    if (o.success === false) {
                        notification.error({
                            text: o.message
                        })
                    } else {
                        localStorage.setItem('accessToken', o.data.accessToken)
                        localStorage.setItem('refreshToken', o.data.refreshToken)

                        // eslint-disable-next-line no-restricted-globals
                        history.back()
                    }
                })
        }
    }

    return <>
        <Header/>
        <main style={{marginTop: 120, minHeight: 500}}>
            <div style={{width: 350, margin: "auto"}}>
                <label htmlFor="username">Tài khoản</label>
                <input onChange={e => setUsername(e.target.value)} type="text" id="username" className="form-control"
                       placeholder="Nhập tài khoản hoặc email"/>
                <label htmlFor="password" style={{marginTop: 20}}>Mật khẩu</label>
                <input onChange={e => setPassword(e.target.value)} type="password" id="password"
                       className="form-control"
                       placeholder="Nhập mật khẩu"/>
            </div>
            <div style={{width: 104, margin: "auto", marginTop: 40}}>
                <button onClick={handleLogin} className="btn btn-primary">Đăng nhập</button>
            </div>
            <div style={{width: 350, margin: "auto", marginTop: 40}}>
                <Link to="/register" style={{float: "left"}}>Đăng ký</Link>
                <Link to="/reset-password" style={{float: "right"}}>Quên mật khẩu</Link>
            </div>
        </main>
        <Footer/>
    </>
}
export default Login