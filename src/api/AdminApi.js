const base = 'http://54.179.82.237/BE-BenShop/api/v1/admin'
const AdminApi = {
    editCategory: (id) => {
        return {
            url: `${base}/category/${id}`,
            method: 'PATCH'
        }
    },
    addCategory: () => {
        return {
            url: `${base}/category`,
            method: 'POST'
        }
    },
    deleteCategory: (id) => {
        return {
            url: `${base}/category/${id}`,
            method: 'DELETE'
        }
    },
    editProduct: (id) => {
        return {
            url: `${base}/product/${id}`,
            method: 'PATCH'
        }
    },
    addProduct: () => {
        return {
            url: `${base}/product`,
            method: 'POST'
        }
    },
    deleteProduct: (id) => {
        return {
            url: `${base}/product/${id}`,
            method: 'DELETE'
        }
    },
    addProductImage: (id) => {
        return {
            url: `${base}/product/${id}/image`,
            method: 'POST'
        }
    },
    editProductImage: (id) => {
        return {
            url: `${base}/product/image/${id}`,
            method: 'PATCH'
        }
    },
    deleteProductImage: (id) => {
        return {
            url: `${base}/product/image/${id}`,
            method: 'DELETE'
        }
    },
    searchOrder: (params) => {
        return {
            url: `${base}/order?${params}`,
            method: 'GET'
        }
    }, editOrderStatus: (id) => {
        return {
            url: `${base}/order/${id}/update-status`,
            method: 'PATCH'
        }
    }
    , getOrderById: (id) => {
        return {
            url: `${base}/order/${id}`,
            method: 'GET'
        }
    },
    totalRevenue: (params) => {
        return {
            url: `${base}/order/total-revenue?${params}`,
            method: 'GET'
        }
    },
    addNote: (id) => {
        return {
            url: `${base}/order/detail/${id}/note`,
            method: 'POST'
        }
    },
    deleteNote: (id) => {
        return {
            url: `${base}/order/detail/note/${id}`,
            method: 'DELETE'
        }
    }
}
export default AdminApi