import { Link } from "react-router-dom";

const PetCard = ({ item }) => {
  console.log(item)
  const {_id, name, age, location, image } = item;
  const id = _id;
  return (
    <div className="card w-[330px] bg-base-100 shadow-xl">
      <figure>
        <img className="h-[350px]"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Age: 0{age}</p>
        <p>Location: {location}</p>
        <div className="card-actions justify-end">
            <Link to={`/details/${id}`}>
                <button className="btn btn-primary">Details</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
