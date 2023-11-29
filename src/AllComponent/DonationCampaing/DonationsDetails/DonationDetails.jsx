import { useState } from "react";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import DonationDetailsCardMake from "./DonationDetailsCardMake";

const DonationDetails = () => {
    const [data, setData] = useState([]);
    // const [petList]=usePetListing()
    const {id} = useParams();
    const donationDetails = useLoaderData();
    
    useEffect( ()=>{
        const findData = donationDetails.find(perData => perData._id == id)
        setData(findData);
    },[id, donationDetails]);
    return (
        <div>
            <DonationDetailsCardMake data={data}></DonationDetailsCardMake>
        </div>
    );
};

export default DonationDetails;