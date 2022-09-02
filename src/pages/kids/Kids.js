import Header from "../../components/Header";
import ShoesList from "../../components/ShoesList";
import Footer from "../../components/Footer";
import Filters from "../../components/Filters";
import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useHistory } from "react-router-dom";
export default function Kids({ data, isPending, error }) {
  const childShoes = data.filter((item) => {
    if (item.gender === "child" && item.retailPrice) {
      return item;
    } else return false;
  });

  const [price, setPrice] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const history = useHistory();

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
      let arr = childShoes.filter((shoe) => {
        if (shoe.retailPrice <= price) {
          return shoe;
        } else return false;
      });
      setFilteredData([...arr]);
    }
  }, [price, childShoes]);
  return (
    <div>
      <Header>FOR KIDS</Header>
      {filteredData && <Filters data={filteredData} getPrice={getPrice} />}
      {data && !filteredData && (
        <Filters data={childShoes} getPrice={getPrice} />
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
      {data && !filteredData && <ShoesList data={childShoes} />}
      {filteredData && <ShoesList data={filteredData} />}

      <Footer />
    </div>
  );
}
