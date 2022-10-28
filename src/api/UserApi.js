const base = 'http://54.179.82.237/BE-BenShop/api/v1/user'
const UserApi = {
    createOrder: () => {
        return {
            url: `${base}/order`,
            method: 'POST'
        }
    },
    searchOrder: (params) => {
        return {
            url: `${base}/order?${params}`,
            method: 'GET'
        }
    },
    editOrderDetailNote: (id) => {
        return {
            url: `${base}/order/detail/note/${id}`,
            method: 'PATCH'
        }
    },
    deleteOrder: (id) => {
        return {
            url: `${base}/order/${id}`,
            method: 'DELETE'
        }
    },
    createCommentProduct: (id) => {
        return {
            url: `${base}/product/${id}/comment`,
            method: 'POST'
        }
    },
    editProductComment: (id)=>{
        return{
            url:`${base}/product/comment/${id}`,
            method:'PATCH'
        }
    },
    deleteProductComment:(id)=>{
        return{
            url:`${base}/product/comment/${id}`,
            method:'DELETE'
        }
    },

    logouts: (params) => {
        return {
            url: `${base}/device/logouts?ids=${params}`,
            method: 'DELETE'
        }
    },
    logout: () => {
        return {
            url: `${base}/device/logout`,
            method: 'DELETE'
        }
    },
    getCurrentUser: () => {
        return {
            url: `${base}`,
            method: 'GET'
        }
    },
    editCurrentUser: () => {
        return {
            url: `${base}`,
            method: 'PATCH'
        }
    },
    editPasswordOrMail: () => {
        return {
            url: `${base}/edit-password`,
            method: 'PATCH'
        }
    }

}
export default UserApi