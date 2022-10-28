import AdminHeader from "../../components/admin/AdminHeader";
import {useEffect, useState} from "react";
import BasicApi from "../../api/BasicApi";
import AdminProductDetail from "../../components/admin/AdminProductDetail";
import Domain from "../../api/Domain";
import jwt_decode from "jwt-decode";
import AdminAddProduct from "../../components/admin/AdminAddProduct";
import AdminDeleteProduct from "../../components/admin/AdminDeleteProduct";

const AdminProduct = () => {
    document.title = 'Quản lý sản phẩm'
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

    const [product, setProduct] = useState({message: null, success: null, data: {content: [], totalPages: null}})
    const [listCategory, setListCategory] = useState({message: null, success: null, data: []})
    const [categoryId, setCategoryId] = useState('')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [productId, setProductId] = useState('')
    let pages = []

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=false').url)
            .then((res) => res.json())
            .then((o) => setListCategory(o));
    }, []);

    useEffect(() => {
        fetch(BasicApi.searchProduct(
            `size=5&categoryId=${categoryId}&page=${page}&search=${search}&productId=${productId}`).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }, [categoryId, page, search, productId]);

    const handleReload = () => {
        fetch(BasicApi.searchProduct(
            `size=5&categoryId=${categoryId}&page=${page}&search=${search}&productId=${productId}`).url)
            .then((res) => res.json())
            .then((o) => setProduct(o));
    }

    for (let i = 0; i < product.data.totalPages; i++) {
        pages.push(i)
    }

    return <>
        <AdminHeader/>
        <main style={{marginTop: 120}}>
            <p className="text-warning">Sản phẩm</p>
            <div className="row">
                <div className="col-sm-3">
                    <input onChange={e => setSearch(e.target.value)} className="form-control" placeholder="Tìm kiếm"/>
                    <p style={{marginTop: 30}}>Danh mục</p>
                    <select className="form-control" onChange={e => setCategoryId(e.target.value)}>
                        <option value=''>Tất cả</option>
                        {listCategory.data.map(o =>
                            <option key={o.id} value={o.id}>{o.name}</option>
                        )}
                    </select>
                    <input className="form-control" style={{marginTop: 30}} placeholder="Mã sản phẩm"
                           onChange={e => setProductId(e.target.value)}/>
                </div>
                <div className="col-sm-9">
                    <ul>
                        <li><h3>Tổng số: {product.data.totalElements} sản phẩm</h3></li>
                        <AdminAddProduct category={listCategory} onReload={handleReload}/>
                        <hr/>
                        {product.data.content.map(o =>
                            <li key={o.id}>
                                <AdminProductDetail product={o} category={listCategory}/>
                                <AdminDeleteProduct product={o} onReload={handleReload}/>
                                <p>Mã sản phẩm: <a href={`/product-detail?id=${o.id}`}>{o.id}</a></p>
                                <p>Tên: {o.name}</p>
                                <p>Ngày cập nhật: {new Date(o.updatedDate).toLocaleString()}</p>
                                <hr/>
                            </li>
                        )}
                    </ul>
                    <div style={{width: 350, margin: "20px auto 200px auto"}}>
                        {pages.map(o =>
                            <input className="btn border border-success page__hover" key={o} type="button" value={o}
                                   onClick={(e) => setPage(e.target.value)}/>)}
                    </div>
                </div>
            </div>
        </main>
    </>
}
export default AdminProduct