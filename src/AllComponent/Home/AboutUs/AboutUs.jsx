const AboutUs = () => {
  return (
    <div className="mt-8 border-b-8 border-black">
      <h1 className="text-7xl">About Us</h1>
      <hr />

      <div className="md:flex">
        <div className="md:w-2/4">
          <h1 className="text-xl bg-black text-white">Explore Profiles:</h1>
          <p>
            Browse through profiles of adorable pets waiting for their forever
            homes. Each profile provides insights into the pet's personality,
            needs, and the kind of home they would thrive in.
          </p>
          <hr />

          <h1 className="text-xl bg-black text-white">Apply for Adoption:</h1>
          <p>
            Once you find a furry friend that tugs at your heartstrings,
            complete our straightforward adoption application. We aim to make
            the process seamless, ensuring a perfect match between pet and
            owner.
          </p>
          <hr />

          <h1 className="text-xl bg-black text-white">Meet and Greet:</h1>
          <p>
            Upon approval, arrange a meet-and-greet to spend time with your
            potential new family member. This step allows you to ensure
            compatibility and establishes a strong foundation for a lasting
            bond.
          </p>
          <hr />

          <h1 className="text-xl bg-black text-white">Welcome Home:</h1>
          <p>
            Once you've found your perfect match, bring your new companion home
            and embark on a journey filled with love, joy, and unforgettable
            moments.
          </p>
          <hr />
        </div>
        <div className="md:w-2/4 px-4 text-lg indent-8 bg-black text-white">
          Our mission goes beyond matchmaking; it's about creating a world where
          every pet experiences the warmth of a loving home. We established this
          platform to combat pet homelessness, promote responsible ownership,
          and celebrate the transformative power of adoption. By choosing [Your
          Pet Adoption Website], you're not just bringing home a pet; you're
          becoming part of a community that values compassion, empathy, and the
          belief that every animal deserves a chance at happiness. Join us in
          rewriting the stories of countless pets, one adoption at a time.
          Together, let's make homes happier and hearts fuller.
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;
