import Axios from "axios";
import { store } from "../";

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const axiosInstance = Axios.create({ baseURL: isDevelopment ? 'http://localhost:3030/api' : "https://ppp-gestion.herokuapp.com/api" });

// request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    config.headers = { 
			Authorization: 'Bearer ' + localStorage.accessToken,
			// 'Accept': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'application/json'
		}
    return config;
  },
  error => {
    Promise.reject(error)
	}
);

// response interceptor for API calls
axiosInstance.interceptors.response.use(
	response => {
		return response
	}, 
	async error => {
		const originalRequest = error.config;
		
		if (error.response.status === 403 && !originalRequest._retry) {
			try {
				originalRequest._retry = true;
				console.log(localStorage.refreshToken);
				const newAccessToken = await axiosInstance.post('/auth/refresh', { refreshToken: localStorage.refreshToken });
				localStorage.setItem('accessToken', newAccessToken.data);      
				Axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken.data;
				return axiosInstance(originalRequest);
			} catch (e) {
				localStorage.setItem("accessToken", '');
				localStorage.setItem("refreshToken", '');
				store.dispatch({ type: 'user/set', payload: null });
			}
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			localStorage.setItem("accessToken", '');
			localStorage.setItem("refreshToken", '');
			store.dispatch({ type: 'user/set', payload: null });
		}
		
  	return Promise.reject(error);
	}
);
axiosInstance.interceptors.response.use(
	response => {
		return response
	}, 
	async error => {
		const originalRequest = error.config;
		
		if (error.response.status === 403 && !originalRequest._retry) {
			try {
				originalRequest._retry = true;
				console.log(localStorage.refreshToken);
				const newAccessToken = await axiosInstance.post('/auth/refresh', { refreshToken: localStorage.refreshToken });
				localStorage.setItem('accessToken', newAccessToken.data);      
				Axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken.data;
				return axiosInstance(originalRequest);
			} catch (e) {
				localStorage.setItem("accessToken", '');
				localStorage.setItem("refreshToken", '');
				store.dispatch({ type: 'user/set', payload: null });
			}
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			localStorage.setItem("accessToken", '');
			localStorage.setItem("refreshToken", '');
			store.dispatch({ type: 'user/set', payload: null });
			console.log(401);
		}
		
  	return Promise.reject(error);
	}
);
axiosInstance.interceptors.response.use(
	response => {
		return response
	}, 
	async error => {
		const originalRequest = error.config;
		
		if (error.response.status === 403 && !originalRequest._retry) {
			try {
				originalRequest._retry = true;
				console.log(localStorage.refreshToken);
				const newAccessToken = await axiosInstance.post('/auth/refresh', { refreshToken: localStorage.refreshToken });
				localStorage.setItem('accessToken', newAccessToken.data);      
				Axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken.data;
				return axiosInstance(originalRequest);
			} catch (e) {
				localStorage.setItem("accessToken", '');
				localStorage.setItem("refreshToken", '');
				store.dispatch({ type: 'user/set', payload: null });
			}
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			localStorage.setItem("accessToken", '');
			localStorage.setItem("refreshToken", '');
			store.dispatch({ type: 'user/set', payload: null });
		}
		
  	return Promise.reject(error);
	}
);

export default axiosInstance;