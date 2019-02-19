import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "https://react-my-burger-c7029.firebaseio.com/",
})

export default axiosInstance
