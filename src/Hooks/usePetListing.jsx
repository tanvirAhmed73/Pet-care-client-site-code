import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

const usePetListing = () => {
    const axiosOpen = useAxiosOpen()
    const {data: petLIsting = [], isPending: loading, refetch} = useQuery({
        queryKey: ['petLIsting'], 
        queryFn: async() =>{
            const res = await axiosOpen.get('/petLIsting');
            return res.data;
        }
    })


    return [petLIsting, loading, refetch]
   
};

export default usePetListing;