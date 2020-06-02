import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS, FILTER_JOBS } from "../queries/Jobs";
import JobCards from "./JobCards";
import "../styles.css";
import { Input, Button, Select } from "antd";
const { Option } = Select;

const HomePage = (props) => {
  const [jobList, setJobList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [loadMore, setLoadMore] = useState(true);

  const { loading, error, data, fetchMore } = useQuery(QUERY_JOBS, {
    variables: {
      offset: 0,
      limit: 100,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ jobs }) => {
      setJobList([...jobs]);
      if (searchResults) setSearchResults([...jobs]);
    },
  });

  useQuery(FILTER_JOBS, {
    variables: {
      title: `%${searchText}%` || `%%`,
      offset: 0,
      limit: 100,
      company: company || null,
      city: city || null,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ jobs }) => {
      if (searchText || company || city) {
        setSearchResults([...jobs]);
      } else if (!searchText) {
        setSearchResults([...jobList]);
      }
    },
  });

  const onChangeSearch = ({ target: { value } }) => {
    setSearchText(value);
    setLoadMore(false);
  };

  const onClickLoadMore = () =>
    fetchMore({
      variables: {
        offset: data.jobs.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          jobs: [...prev.jobs, ...fetchMoreResult.jobs],
        });
      },
    });

  const onClickClearFilters = () => {
    setSearchText("");
    setCompany(null);
    setCity(null);
    setSearchResults(jobList);
    setLoadMore(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  let relevantCompanies = Array.from(new Set(jobList.map((s) => s.company)));
  let relevantCities = Array.from(new Set(jobList.map((s) => s.city)));

  return (
    <div>
      <Input
        className="input-search"
        placeholder="Search job title" //do not work in Antd as the values are controlled
        onChange={onChangeSearch}
        allowClear
        type="text"
        value={searchText}
      />
      <span className="filter-jobs-span">Company: </span>
      <Select
        className="filter-select"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder="Select company" //do not work in Antd as the values are controlled
        value={company}
        onSelect={(e) => setCompany(e)}
      >
        {relevantCompanies.map((c) => {
          return (
            <Option value={c.id} key={c.name}>
              {c.name}
            </Option>
          );
        })}
      </Select>
      <span className="filter-jobs-span">City: </span>

      <Select
        className="filter-select"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder="Select city"
        value={city}
        onSelect={(e) => setCity(e)}
      >
        {relevantCities.map((c) => {
          return (
            <Option value={c} key={c}>
              {c}
            </Option>
          );
        })}
      </Select>
      <Button className="clear-filter-button" onClick={onClickClearFilters}>
        Clear filters
      </Button>
      <JobCards data={searchResults}></JobCards>
      <div>
        <Button
          className="load-more-button"
          style={{
            visibility: !loadMore ? "hidden" : "visible",
          }}
          onClick={onClickLoadMore}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
