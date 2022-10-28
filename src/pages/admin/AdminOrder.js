import AdminHeader from "../../components/admin/AdminHeader";
import Domain from "../../api/Domain";
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";
import AdminApi from "../../api/AdminApi";
import BasicApi from "../../api/BasicApi";
import AdminEditOrderStatus from "../../components/admin/AdminEditOrderStatus";

const AdminOrder = () => {
    document.title = 'Quản lý đơn hàng'
    const check_arr = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'ROLE_ADMIN') {
                return true
            }
        }
        return false
    }

    if (localStorage.getItem('accessToken') == null) {
        window.location = Domain + '/login'
    } else {
        if (!check_arr(jwt_decode(localStorage.getItem('accessToken')).roles)) {
            window.location = Domain + '/login'
        }
    }

    const [status, setStatus] = useState('')
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(Date.now)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState({message: null, success: null, data: {content: [], totalPages: null}})
    const [page, setPage] = useState(0)
    let pages = []

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null) {
            fetch(AdminApi.totalRevenue(`status=${status}&startTime=${startTime}&endTime=${endTime}&orderId=${orderId}`).url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
                .then(resp => resp.json())
                .then(o => {
                        if (o.success === false) {
                            if (o.errorCode === 401) {
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
                                                localStorage.setItem('accessToken', oo.data.accessToken)
                                                localStorage.setItem('refreshToken', oo.data.refreshToken)
                                                AdminOrder()
                                            }
                                        })
                                }
                            }
                        } else {
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            setTotalRevenue(o.data)
                        }
                    }
                )
        }
    }, [status, startTime, endTime, orderId]);

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null) {
            fetch(AdminApi.searchOrder(`size=5&page=${page}&status=${status}&startTime=${startTime}&endTime=${endTime}&orderId=${orderId}`).url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
                .then(resp => resp.json())
                .then(o => {
                        if (o.success === false) {
                            if (o.errorCode === 401) {
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
                                                localStorage.setItem('accessToken', oo.data.accessToken)
                                                localStorage.setItem('refreshToken', oo.data.refreshToken)
                                                AdminOrder()
                                            }
                                        })
                                }
                            }
                        } else {
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            setOrder(o)
                        }
                    }
                )
        }
    }, [status, startTime, endTime, page, orderId]);

    for (let i = 0; i < order.data.totalPages; i++) {
        pages.push(i)
    }

    return <>
        <AdminHeader/>
        <main style={{margin: "120px 0"}}>
            <p className="text-warning">Đơn hàng</p>
            <div className="row">
                <div className="col-sm-3 border-right">
                    <label htmlFor="trangThai">Trạng thái</label>
                    <select className="form-control" id="trangThai" onChange={e => setStatus(e.target.value)}>
                        <option value="">Tất cả</option>
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="RESOLVED">Đã xử lý</option>
                        <option value="COMPLETED">Giao thành công</option>
                        <option value="CANCELED">Hủy bỏ</option>
                    </select>
                    <label htmlFor="tu" style={{marginTop: 20}}>Từ</label>
                    <input type="datetime-local" id="tu" className="form-control"
                           onChange={e => setStartTime(Date.parse(e.target.value))}/><br/>
                    <label htmlFor="den">Đến</label>
                    <input type="datetime-local" id="den" className="form-control"
                           onChange={e => setEndTime(Date.parse(e.target.value))}/>
                    <input placeholder="Mã đơn hàng" style={{marginTop: 30}} className="form-control"
                           onChange={e => setOrderId(e.target.value)}/>
                </div>
                <div className="col-sm-9">
                    <h3>Tổng: {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</h3>
                    {order.data.content.map(o =>
                        <ul key={o.id}>
                            <hr/>
                            <li>
                                <AdminEditOrderStatus order={o}/>
                            </li>
                            <li>Mã đơn hàng: {o.id}</li>
                            <li>Trạng
                                thái: {o.status === 'PENDING' ? 'Chờ xử lý' : (o.status === 'RESOLVED' ? 'Đã xử lý' : (o.status === 'COMPLETED' ? 'Giao thành công' : 'Đã hủy'))}</li>
                            <li>Ngày cập nhật: {new Date(o.updatedDate).toLocaleString()}</li>
                        </ul>
                    )}
                </div>
                <div style={{width: 350, margin: "20px auto 0 auto"}}>
                    {pages.map(o =>
                        <input className="btn border border-success page__hover" key={o} type="button" value={o}
                               onClick={(e) => setPage(e.target.value)}/>)}
                </div>
            </div>
        </main>
    </>
}
export default AdminOrder