import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

const useDonationCampaign = () => {
    const axiosOpen = useAxiosOpen()
    const {data: donationCampaign = [], isPending: loading, refetch} = useQuery({
        queryKey: ['donationCampaign'], 
        queryFn: async() =>{
            const res = await axiosOpen.get('/donationCampaign');
            return res.data;
        }
    })


    return [donationCampaign, loading, refetch]
   
};

export default useDonationCampaign;