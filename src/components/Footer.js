import {Link} from "react-router-dom";

const Footer = () => {
    return <footer className="footer justify-content-center">
        <hr className="mx-0 px-0"/>
        <div className="row justify-content-around mb-0 pt-5 pb-0 ">
            <div className=" col-11">
                <div className="row justify-content-center">

                    <div className="col-md-3 col-12 my-sm-0 mt-5">
                        <ul className="list-unstyled">
                            <li className="mt-md-3 mt-4" style={{fontWeight: 600}}>Tổng đài hỗ trợ</li>
                            <li>Liên hệ đặt hàng</li>
                            <li>Thắc mắc đơn hàng</li>
                            <li>Góp ý khiếu nại</li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-12 my-sm-0 mt-5">
                        <ul className="list-unstyled">
                            <li className="mt-md-3 mt-4" style={{fontWeight: 600}}>Về Ben Shop</li>
                            <li><a href="/" className="link-to text-dark">Giới thiệu</a></li>
                            <li><a href="/" className="link-to text-dark">Liên hệ</a></li>
                            <li><a href="/" className="link-to text-dark">Hệ thống cửa hàng</a></li>
                            <li><a href="/" className="link-to text-dark">Sản phẩm</a></li>
                        </ul>
                    </div>
                    <div className="col-xl-auto col-md-3 col-12 my-sm-0 mt-5">
                        <ul className="list-unstyled">
                            <li className="mt-md-3 mt-4" style={{fontWeight: 600}}>Chăm sóc khách hàng</li>
                            <li><a href="/" className="link-to text-dark">Chính sách đổi trả</a></li>
                            <li><a href="/" className="link-to text-dark">Chính sách bảo hành</a></li>
                            <li><a href="/" className="link-to text-dark">Chính sách hoàn tiền</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-12 font-italic align-items-center mt-md-3 mt-4">
                        <h5><b className="text-warning"> Ben<span
                            className="text-muted"> Shop</span></b></h5>
                        <p className="social ">
                            <span><i className="fa fa-facebook " aria-hidden="true"/></span>
                            <span><i className="fa fa-linkedin" aria-hidden="true"/></span>
                            <span><i className="fa fa-twitter" aria-hidden="true"/></span>
                        </p>
                        <small className="copy-rights cursor-pointer text-success">2022 Ben Shop</small><br/>
                        <small>Copyright.All Rights Resered. </small><br/>
                        <small>
                            <Link to='/admin/category'>
                                admin
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
export default Footer