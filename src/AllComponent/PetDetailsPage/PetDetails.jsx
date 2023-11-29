import { useLoaderData, useParams } from "react-router-dom";
// import usePetListing from "../../Hooks/usePetListing";
import { useEffect } from "react";
import { useState } from "react";
import PetDetailsCardMake from "./PetDetailsCardMake";

const PetDetails = () => {
    const [data, setData] = useState([])
    // const [petList]=usePetListing()
    const {id} = useParams()
    console.log(id)
    const proDetails = useLoaderData();
    useEffect( ()=>{
        const findData = proDetails.find(perData => perData._id == id)
        setData(findData);
    },[id, proDetails]);

    return (
        <div>
            <PetDetailsCardMake data={data}></PetDetailsCardMake>
        </div>
    );
};

export default PetDetails;