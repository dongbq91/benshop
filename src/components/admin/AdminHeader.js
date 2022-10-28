import {Link} from "react-router-dom";

const AdminHeader = () => {
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
                    <Link className="nav-link" to="/admin/category">Danh mục</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/product">Sản phẩm</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/order">Đơn hàng</Link>
                </li>
            </ul>
        </nav>
    </header>
}
export default AdminHeader