import { useEffect, useState } from "react";
import ShoesList from "../../components/ShoesList";
import Footer from "../../components/Footer";
import Filters from "../../components/Filters";
import { useHistory } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
//styles
import Header from "../../components/Header";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
    "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
  },
};

export default function All() {
  const [price, setPrice] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const history = useHistory();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    const getShoes = () => {
      setIsPending(true);
      try {
        fetch("https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20", {
          ...options,
          signal: controller.signal,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            } else {
              return response.json();
            }
          })
          //data.results
          .then((data) => setData([...data.results]))
          .catch((err) => console.error(err));
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        }
        setError("Could not fetch the data");
      }
      setIsPending(false);
    };

    getShoes();

    return () => {
      controller.abort();
    };
  }, []);

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
      {isPending && <p className="loading">Loading...</p>}
      {error && <p>{error}</p>}
      {filteredData && <Filters data={filteredData} getPrice={getPrice} />}
      {data && !filteredData && <Filters data={data} getPrice={getPrice} />}
      {data && !filteredData && <ShoesList data={data} />}
      {filteredData && <ShoesList data={filteredData} />}

      <Footer />
    </div>
  );
}
