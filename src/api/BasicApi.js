const base = 'http://54.179.82.237/BE-BenShop/api/v1/basic'
const BasicApi = {
    login: () => {
        return {
            url: `${base}/auth/login`,
            method: 'POST'
        }
    },
    refreshToken: () => {
        return {
            url: `${base}/auth/refresh-token`,
            method: 'PATCH'
        }
    },
    register: () => {
        return {
            url: `${base}/auth/register`,
            method: 'POST'
        }
    },
    getAllCategory: (params) => {
        return {
            url: `${base}/category?${params}`,
            method: 'GET'
        }
    },
    getProductById: (id) => {
        return {
            url: `${base}/product/${id}`,
            method: 'GET'
        }
    },
    searchProduct: (params) => {
        return {
            url: `${base}/product?${params}`,
            method: 'GET'
        }
    },
    searchProductByProductId: (params, id) => {
        return {
            url: `${base}/product/${id}/category?${params}`,
            method: 'GET'
        }
    },
    resetPassword: () => {
        return {
            url: `${base}/auth/reset-password`,
            method: 'POST'
        }
    },
    getCommentByProductId: (id, params) => {
        return {
            url: `${base}/product/${id}/comment?${params}`,
            method: 'GET'
        }
    },
}
export default BasicApi