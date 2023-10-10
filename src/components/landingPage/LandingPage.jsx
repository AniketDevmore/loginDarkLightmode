import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMade, setDarkMode] = useState(false);
  const [data, setData] = useState([]);

  const [dataPerPage, setDataPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState(data);

  const getData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        // console.log(data.data)
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // pagination
  const arrayOfPagination = (dataPerPage, totalData) => {
    return Array.from(Array(Math.ceil(totalData / dataPerPage)).keys());
  };

  const currentData = (filteredData, dataPerPage, currentPage) => {
    return filteredData.slice(
      dataPerPage * currentPage,
      dataPerPage * currentPage + dataPerPage
    );
  };

  const paginate = (page) => setCurrentPage(page);

  const clickHandle = () => {
    if (!darkMade) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const logoutHandle = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/");
  };

  useEffect(() => {
    getData();
    setFilteredData(data);
  }, [data]);

  return (
    <div
      className="landingOuter"
      style={
        darkMade
          ? { backgroundColor: "#000", color: "#fff" }
          : { backgroundColor: "#fff", color: "#000" }
      }
    >
      <div className="checkbox">
        <input onClick={clickHandle} id="checkbox" type="checkbox" />
        <label htmlFor="checkbox">Dark Mode/Light Mode</label>
      </div>

      <div className="logout">
        <button className="btn" onClick={logoutHandle}>
          Logout
        </button>
      </div>

      <div className="list">
        <ul className="listUl">
          {currentData(filteredData, dataPerPage, currentPage).map((ele, i) => (
            <li className="listLi" key={i}>
              {ele.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          {arrayOfPagination(dataPerPage, data.length).map((ele, i) => (
            <li style={{ margin: "10px" }} key={i}>
              <a
                style={{
                  textDecoration: "none",
                  padding: "3px",
                  border: "1px solid black",
                }}
                href="#"
                onClick={() => paginate(ele)}
              >
                {ele + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
