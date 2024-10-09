import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector,useDispatch  } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const { search } = useParams();
    const listings = useSelector((state) => state.listings);
  
    const dispatch = useDispatch();
  
    const getSearchListings = async () => {
      try {
        console.log("Fetching search listings for:", search); // Log search term
  
        const response = await fetch(`http://localhost:3001/listing/search/${search}`, {
          method: "GET"
        });
  
        const data = await response.json();
        console.log("Fetched listings:", data); // Log fetched listings
  
        dispatch(setListings({ listings: data }));
        setLoading(false);
      } catch (err) {
        console.log("Fetching Search List failed!", err.message);
      }
    };
  
    useEffect(() => {
      getSearchListings();
    }, [search]);
  
    return loading ? <Loader /> : (
      <>
        <Navbar />
        <h1 className="title-list">{search}</h1>
        <div className="list">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
        <Footer />
      </>
    );
  };
  
  export default SearchPage;
  