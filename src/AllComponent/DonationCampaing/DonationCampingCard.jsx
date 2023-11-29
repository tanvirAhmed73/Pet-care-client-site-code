import { Link } from "react-router-dom";

const DonationCampingCard = ({ item }) => {
  const {_id, maxDonationAmount, donatedAmount, name,image } = item;
  const id = _id;
  return (
    <div className="card w-[330px] bg-base-100 shadow-xl">
      <figure>
        <img className="h-[350px]" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Maximum Donation Amount : {maxDonationAmount}</p>
        <p>Donated Amount: {donatedAmount}</p>
        <div className="card-actions justify-end">
          <Link to={`/donationDetails/${id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCampingCard;
