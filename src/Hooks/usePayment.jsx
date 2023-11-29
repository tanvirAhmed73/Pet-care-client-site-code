import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

const usePayment = () => {
    const axiosOpen = useAxiosOpen()
    const {data: payment = [], isPending: loading, refetch} = useQuery({
        queryKey: ['payment'], 
        queryFn: async() =>{
            const res = await axiosOpen.get('/create-payment');
            return res.data;
        }
    })


    return [payment, loading, refetch]
   
};

export default usePayment;