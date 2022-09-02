import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ShoesList from "../../components/ShoesList";
import Footer from "../../components/Footer";
import Filters from "../../components/Filters";
import { useHistory } from "react-router-dom";
//styles
import Header from "../../components/Header";

export default function All({ data, isPending, error }) {
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
      let arr = data.filter((shoe) => {
        if (shoe.retailPrice <= price) {
          return shoe;
        } else return false;
      });
      setFilteredData([...arr]);
    }
  }, [price, data]);

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
