import {useNotification} from "react-hook-notification";
import {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import BasicApi from "../api/BasicApi";

const Register = () => {
    const notification = useNotification();
    const [username, setUsername] = useState('')
    const [xtPassword, setXTPassword] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')
    document.title='Đăng ký'

    function handleRegister() {
        if (username.length < 1 || username.length > 50 || /[^\w]/.test(username)) {
            notification.error({
                text: 'Tài khoản chỉ bao gồm a-z, A-Z, 0-9, tối thiểu 1 ký tự, tối đa 50 ký tự'
            })
        }
        if (email.length > 50 || /^\w{1,}([\.-]{0,1}\w{1,}){0,}@\w{1,}([\.-]{0,1}\w{1,}){0,}(\.\w{2,3}){1,}$/.test(email) === false) {
            notification.error({
                text: 'Phải nhập đúng dạng email, tối đa 50 ký tự'
            })
        }
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/.test(pass) === false || pass.length > 16) {
            notification.error({
                text: 'Mật khẩu phải chứa ký tự đặc biệt, a-z, A-Z, 0-9, tối thiểu 8 ký tự, tối đa 16 ký tự'
            })
        }
        if (pass !== xtPassword) {
            notification.error({
                text: 'Mật khẩu không khớp'
            })
        } else if (username.length >= 1
            && username.length <= 50
            && /[\w]/.test(username)
            && email.length <= 50
            && /^\w{1,}([\.-]{0,1}\w{1,}){0,}@\w{1,}([\.-]{0,1}\w{1,}){0,}(\.\w{2,3}){1,}$/.test(email)
            && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/.test(pass)
            && pass.length <= 16
            && pass === xtPassword) {
            fetch(BasicApi.register().url, {
                method: BasicApi.register().method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, email: email, password: pass})
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

                <label htmlFor="username">Tài khoản</label>
                <input onChange={e => setUsername(e.target.value)} id="username" className="form-control"
                       placeholder="Nhập tài khoản"/>

                <label htmlFor="email" style={{marginTop: 20}}>Email</label>
                <input onChange={e => setEmail(e.target.value)} id="email" className="form-control"
                       placeholder="Nhập email"/>

                <label htmlFor="pass" style={{marginTop: 20}}>Mật khẩu</label>
                <input onChange={e => setPass(e.target.value)} type="password" id="pass"
                       className="form-control"
                       placeholder="Nhập mật khẩu"/>

                <label htmlFor="xtPassword" style={{marginTop: 20}}>Nhập lại mật khẩu</label>
                <input onChange={e => setXTPassword(e.target.value)} type="password" id="xtPassword"
                       className="form-control"
                       placeholder="Nhập lại mật khẩu"/>
            </div>
            <div style={{width: 84, margin: "auto", marginTop: 40}}>
                <button onClick={handleRegister} className="btn btn-primary">Đăng ký</button>
            </div>
            <div style={{width: 350, margin: "auto", marginTop: 40}}>
                <Link to="/login" style={{float: "left"}}>Đăng nhập</Link>
                <Link to="/reset-password" style={{float: "right"}}>Quên mật khẩu</Link>
            </div>
        </main>
        <Footer/>
    </>
}

export default Register