import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BasicApi from "../api/BasicApi";
import BlockCart from "./BlockCart";
import Logout from "./Logout";

const Header = () => {
    const [category, setCategory] = useState({message: null, success: null, data: []})
    const [boole, setBoole] = useState(false)

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((o) => setCategory(o));
    }, []);

    useEffect(() => {
        window.addEventListener('emitToken', ({detail}) => {
            setBoole(detail !== null)
        })
    }, [boole]);

    return <header>
        <nav className="fixed-top container">
            <Link to="/">
                <h2 className="align-middle text-center" style={{backgroundColor: "white"}}>
                    <em>
                        <b className="text-warning"> Ben<span className="text-muted"> Shop</span></b>
                    </em>
                </h2>
            </Link>
            <ul className="nav nav-tabs" style={{backgroundColor: "white", marginTop: -10}}>
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Trang chủ</Link>
                </li>

                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="/product" role="button"
                          aria-expanded="false">Sản phẩm</Link>
                    <div className="dropdown-menu">
                        {category.data.map(o =>
                            <div key={o.id}>
                                <Link className="dropdown-item"
                                      to={`/product?category=${o.id}`}>{o.name}</Link>
                                {o.categories1.map(oo =>
                                    <ul key={oo.id}>
                                        <li>
                                            <Link to={`/product?category=${oo.id}`}
                                                  className="dropdown-item">{oo.name}</Link>
                                            {oo.categories2.map(ooo =>
                                                <ul key={ooo.id}>
                                                    <li>
                                                        <Link to={`/product?category=${ooo.id}`}
                                                              className="dropdown-item">{ooo.name}</Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </li>
                <BlockCart/>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                       aria-expanded="false"><i className="bi bi-person-circle"/></a>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/user/user-detail">Tài khoản</Link>
                        {boole ? <Link className="dropdown-item" to="/user/list-devices">Thiết bị đăng nhập</Link> : ''}
                        {boole ? <Link className="dropdown-item" to="/user/edit-user-email">Thay đổi mật khẩu và
                            email</Link> : ''}
                        <Link className="dropdown-item" to="/purchase-order">Đơn mua</Link>
                        {!boole ? <Link className="dropdown-item" to="/register">Đăng ký</Link> : ''}
                        {boole ? <Logout/> : ''}
                        {!boole ? <Link className="dropdown-item" to="/login">Đăng nhập</Link> : ''}
                    </div>
                </li>
            </ul>
        </nav>
    </header>
}
export default Header