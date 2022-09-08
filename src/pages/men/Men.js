import { Fragment, useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Header from "../../components/Header";
import ShoesList from "../../components/ShoesList";
import Footer from "../../components/Footer";
import Filters from "../../components/Filters";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function Men() {
  const [price, setPrice] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const history = useHistory();

  const { data, isPending, error } = useFetch(
    "https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20"
  );

  useEffect(() => {
    if (error) {
      history.push("/error");
    }
  }, [error, history]);

  const mensShoes = data.filter((item) => {
    if (item.gender === "men" && item.retailPrice) {
      return item;
    } else return false;
  });

  const getPrice = (price) => {
    setPrice(price);
  };

  useEffect(() => {
    if (price) {
      let arr = mensShoes.filter((shoe) => {
        if (shoe.retailPrice <= price) {
          return shoe;
        } else return false;
      });
      setFilteredData([...arr]);
    }
  }, [price, mensShoes]);

  return (
    <Fragment>
      <Header>FOR MEN</Header>
      {filteredData && <Filters data={filteredData} getPrice={getPrice} />}
      {data && !filteredData && (
        <Filters data={mensShoes} getPrice={getPrice} />
      )}
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
      {filteredData && <ShoesList data={filteredData} />}
      {!filteredData && data && <ShoesList data={mensShoes} />}
      <Footer />
    </Fragment>
  );
}
