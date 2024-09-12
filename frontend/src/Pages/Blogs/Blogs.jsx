import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import Footer from "../../Component/Navigation/Footer";

const Blogs = () => {
    return (
    <div>
        <div
                className="pt-5 lg:h-96 h-40 md:h-56"
                style={{
                    backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Header />
                <Helmet>
                <meta charSet="utf-8" />
                <title>Explore Blogs - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="Explore Blogs" color="white" />
        </div>


        <Footer />    
    </div>
    );
};

export default Blogs;