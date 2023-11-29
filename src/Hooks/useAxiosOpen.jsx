import axios from "axios";

const axiosOpen = axios.create({
    baseURL: 'https://project-twelve-omega.vercel.app/'
})
const useAxiosOpen = () => {
    return axiosOpen;
};

export default useAxiosOpen;