import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  url: "https://covid-193.p.rapidapi.com/statistics",
  headers: {
    "X-RapidAPI-Key": "c610f37724mshca34574554fd4d5p1959eajsnb27b9bb388f2",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};

const countryPopulationColumns = [
  { field: "country", headerName: "Country", width: 150 },
  { field: "population", headerName: "Population", width: 150 },
  { field: "continent", headerName: "Continent", width: 150 },
  { field: "new", headerName: "New Cases", width: 130 },
  { field: "active", headerName: "Active Cases", width: 140 },
  { field: "perMillion", headerName: "Per Million", width: 140 },
  { field: "deaths", headerName: "Total Deaths", width: 140 },
  { field: "deathsPerMillion", headerName: "Deaths Per Million", width: 140 },
];

const AxiosHookDemo = () => {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let res = await axios.request(options);
      console.log(res.data);
      setCountries(res.data.response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // with .then .catch
  const loadDataThen = () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const renderPopulation = () => {
    if (!countries) {
      return "loading";
    }
    // create an array of object with {name, population}
    let countryPopulation = countries
      .map((c, i) => {
        return {
          id: i,
          country: c.country,
          population: c.population,
          continent: c.continent,
          new: c.cases.new ? parseInt(c.cases.new.replace('+','')) : 0,
          active: c.cases.active ? parseInt(c.cases.active) : 0,
          perMillion: c.cases['1M_pop'] ? parseInt(c.cases['1M_pop']) : 0,
          deaths: c.deaths.total ? parseInt(c.deaths.total) : 0,
          deathsPerMillion: c.deaths['1M_pop'] ? parseInt(c.deaths['1M_pop']) : 0,
        };
      })
      .filter((c) => c.population > 0);
    return (
      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          rows={countryPopulation}
          columns={countryPopulationColumns}
          pageSize={15}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>AxiosHookDemo</h1>
      <h1>population</h1>
      {renderPopulation()}
    </div>
  );
};
export default AxiosHookDemo;
