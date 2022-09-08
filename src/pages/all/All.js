import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ShoesList from "../../components/ShoesList";
import Footer from "../../components/Footer";
import Filters from "../../components/Filters";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
//styles
import Header from "../../components/Header";

export default function All() {
  const [price, setPrice] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const history = useHistory();

  const { data, isPending, error } = useFetch(
    "https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20"
  );

  const allShoes = data.filter((item) => {
    if (item.retailPrice && item.media.thumbUrl) {
      return item;
    } else return false;
  });

  const shoesArr = allShoes.map((item) => ({ ...item, qty: 0 }));

  useEffect(() => {
    if (error) {
      history.push("/error");
    }
  }, [error, history]);

  const getPrice = (price) => {
    setPrice(price);
  };
  useEffect(() => {
    if (price) {
      let arr = shoesArr.filter((shoe) => {
        if (shoe.retailPrice <= price) {
          return shoe;
        } else return false;
      });
      setFilteredData([...arr]);
    }
  }, [price, shoesArr]);

  return (
    <div>
      <Header>ALL SHOES</Header>
      {filteredData && <Filters data={filteredData} getPrice={getPrice} />}
      {data && !filteredData && <Filters data={data} getPrice={getPrice} />}
      {error && <p>{error}</p>}
      <div className="loadingDiv">
        {isPending && (
          <ClimbingBoxLoader
            className="loading"
            color={"#000000"}
            loading={isPending}
            size={25}
          />
        )}
      </div>
      {data && !filteredData && <ShoesList data={data} />}
      {filteredData && <ShoesList data={filteredData} />}

      <Footer />
    </div>
  );
}
