import SectionTitle from "../../SectionTitle/SectionTitle";

const Testimonial = () => {
    return (
        <div className="mx-auto justify-center items-center my-7">
            <SectionTitle  heading={'Testimonials'}>
            </SectionTitle>

            <div className="rating rating-lg items-center ml-[110px] md:ml-[280px] lg:ml-[380px]">
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400"  />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked/>
            </div>

            <p className="px-20 mt-2">      
                "Finding our perfect furry friend was a breeze with [Your Pet Adopting Website].
                 The user-friendly interface, detailed profiles, and seamless communication with shelters made the process a joy.
                  Now our home is filled with happiness, all thanks to [Your Pet Adopting Website]!"
            </p>
            <h1 className="text-yellow-600 text-center">-JANE DOE</h1>


        </div>
    );
};

export default Testimonial;