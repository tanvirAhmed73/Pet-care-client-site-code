import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";


const useAdoptionRequest = () => {
    const axiosOpen = useAxiosOpen()
    const {data: adoptionRequest = [], isPending: loading, refetch} = useQuery({
        queryKey: ['adoptionRequest'], 
        queryFn: async() =>{
            const res = await axiosOpen.get('/adoptionRequest');
            return res.data;
        }
    })


    return [adoptionRequest, loading, refetch]
};

export default useAdoptionRequest;