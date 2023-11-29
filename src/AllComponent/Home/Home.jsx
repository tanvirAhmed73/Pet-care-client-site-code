import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import ContactUs from "./ContactUs/ContactUs";
import InspritionSection from "./InsparitionBannerSection/InspritionSection";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Category></Category>
        <InspritionSection></InspritionSection>
        <ContactUs></ContactUs>
        <AboutUs></AboutUs>
        <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
