import Header from "../../components/Header";
import ShoesList from "../../components/ShoesList";
import Footer from "../../components/Footer";
import Filters from "../../components/Filters";
import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function Women() {
  const { data, isPending, error } = useFetch(
    "https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20"
  );
  const history = useHistory();
  useEffect(() => {
    if (error) {
      history.push("/error");
    }
  }, [error, history]);

  const womenShoes = data.filter((item) => {
    if (item.gender === "women" && item.retailPrice) {
      return item;
    } else return false;
  });
  const [price, setPrice] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const getPrice = (price) => {
    setPrice(price);
  };
  useEffect(() => {
    if (price) {
      let arr = womenShoes.filter((shoe) => {
        if (shoe.retailPrice <= price) {
          return shoe;
        } else return false;
      });
      setFilteredData([...arr]);
    }
  }, [price, womenShoes]);

  return (
    <div>
      <Header>FOR WOMEN</Header>
      {filteredData && <Filters data={filteredData} getPrice={getPrice} />}
      {data && !filteredData && (
        <Filters data={womenShoes} getPrice={getPrice} />
      )}
      {error && <p>{error}</p>}
      {isPending && (
        <div className="loadingDiv">
          <ClimbingBoxLoader
            className="loading"
            color={"#000000"}
            loading={isPending}
            size={25}
          />
        </div>
      )}
      {data && !filteredData && <ShoesList data={womenShoes} />}
      {filteredData && <ShoesList data={filteredData} />}

      <Footer />
    </div>
  );
}
