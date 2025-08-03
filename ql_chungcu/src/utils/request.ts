// src/lib/request.ts
import axios from 'axios';
import {toast} from "sonner";

const request = axios.create({
    baseURL: 'http://localhost:8000/api', // Sử dụng proxy
    headers: {
        Accept: 'application/json',
    },
});

request.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        handleAxiosStatusCode(error);
        return Promise.reject(error)
    }
);


export function handleAxiosStatusCode(error: unknown) {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
            case 400:
                toast.error(data.message);
                break;

            case 401:
                toast.warning("Unauthorized:", data.message);
                // Chuyển sang trang đăng nhập hoặc thông báo
                // navigate('/login');
                break;

            case 403:
                toast.warning("Forbidden:", data.message);
                // Hiển thị lỗi không có quyền
                break;

            case 404:
                toast.warning("Not Found:", data.message);
                // Hiển thị trang 404
                break;

            case 500:
                toast.error("Server Error:", data.message);
                // Báo lỗi hệ thống
                break;

            default:
                toast.message('Lỗi:', {
                    description: data?.message || error.message,
                })
        }
    } else {
        // Lỗi không phải từ axios (ví dụ lỗi JS khác)
        toast("Unexpected error: " + error);
    }
}


export default request;
