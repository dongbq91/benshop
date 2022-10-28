import AdminHeader from "../../components/admin/AdminHeader";
import {useEffect, useState} from "react";
import BasicApi from "../../api/BasicApi";
import jwt_decode from "jwt-decode";
import Domain from "../../api/Domain";
import AdminEditCategory from "../../components/admin/AdminEditCategory";
import AdminAddCategory from "../../components/admin/AdminAddCategory";
import AdminDeleteCategory from "../../components/admin/AdminDeleteCategory";

const AdminCategory = () => {
    document.title = 'Quản lý danh mục'
    const [category, setCategory] = useState({message: null, success: null, data: []})

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

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((o) => setCategory(o));
    }, []);

    const handleCategory = () => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((o) => setCategory(o));
    }

    return <>
        <AdminHeader/>
        <main style={{margin: "120px 0"}}>
            <p className="text-warning">Danh mục</p>
            <AdminAddCategory category={{id: null}} onReload={handleCategory}/>
            {category.data.map(o =>
                <ul key={o.id}>
                    <li>
                        <AdminEditCategory category={o}/>
                        <AdminAddCategory category={o} onReload={handleCategory}/>
                        <AdminDeleteCategory category={o} onReload={handleCategory}/>
                    </li>
                    {o.categories1.map(oo =>
                        <ul key={oo.id}>
                            <li>
                                <AdminEditCategory category={oo}/>
                                <AdminAddCategory category={oo} onReload={handleCategory}/>
                                <AdminDeleteCategory category={oo} onReload={handleCategory}/>
                            </li>
                            {oo.categories2.map(ooo =>
                                <ul key={ooo.id}>
                                    <li>
                                        <AdminEditCategory category={ooo}/>
                                        <AdminDeleteCategory category={ooo} onReload={handleCategory}/>
                                    </li>
                                </ul>
                            )}
                        </ul>
                    )}
                </ul>
            )}
        </main>
    </>
}
export default AdminCategory