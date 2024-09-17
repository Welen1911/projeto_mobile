import axios from "axios"
import category from "./category"

const API_ENVS = {
  //   production: "https://feed-backer-backend.vercel.app/api/api",
  development: '',
  local: 'http://192.168.0.105:8000/api',
  // local: 'http://20.7.252.71/api'
}

const httpClient = axios.create({
  //   baseURL: API_ENVS.production ?? API_ENVS.local,
  baseURL: API_ENVS.local
})

// httpClient.interceptors.request.use((config) => {
//   console.log('Entrou aqui!')
  
//   const token = window.localStorage.getItem('token')
//   if (token) {
//     console.log(token)
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   const loginToken = window.localStorage.getItem('AccessToken')
//   if (loginToken) {
//     console.log('header', config.headers);
//     config.headers = {...config.headers, 'Login-token' : loginToken};
//   }
//   return config
// })

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('error:', error)

    const canThrowAnError = error.request.status === 0 || error.request.status === 500

    if (canThrowAnError) {
      throw new Error(error.message)
    }
    return error.response
  }
)

export default {
  category: category(httpClient)
}
