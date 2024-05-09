// components/Home.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import { Table, Input } from "antd";
import {
  setTags,
  setData,
  setFilteredData,
  setPagination,
  setAllTags,
  setSearchText,
} from "../../store/store.js";
import { fetchData } from "../../utils/api";
import { columns } from "../../utils/columns";

const Home = () => {
  const { data, filteredData, selectedTags, pagination, allTags, searchText } =
    useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleChange = (selectedValues) => {
    dispatch(setTags(selectedValues));
    const newFilteredData = data.filter((post) =>
      selectedValues.every((tag) =>
        post.tags.some((postTag) =>
          postTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
    dispatch(setFilteredData(newFilteredData));
    dispatch(setSearchText(""));
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(setPagination({ current, pageSize }));
  };

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value));
    const newData = data.filter((post) =>
      post.body.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );

    dispatch(setFilteredData(newData));
    dispatch(setTags([]));
  };
  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await fetchData();
      dispatch(setData(response.posts));
      dispatch(setFilteredData(response.posts));
      const tags = new Set();
      response.posts?.forEach((post) =>
        post.tags.forEach((tag) => tags.add(tag))
      );
      dispatch(
        setAllTags(Array.from(tags).map((tag) => ({ value: tag, label: tag })))
      );

      if (searchText !== "") {
        const newData = response.posts.filter((post) =>
          post.body.toLowerCase().includes(searchText.toLowerCase().trim())
        );
        dispatch(setFilteredData(newData));
      }
      if (selectedTags.length > 0) {
        handleChange(selectedTags);
      }
    };

    fetchAllPosts();
  }, []);

  const handleTagClick = (value) => {
    const allSelected = [...selectedTags, value];
    const newFilteredData = data.filter((post) =>
      allSelected.every((tag) =>
        post.tags.some((postTag) =>
          postTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
    dispatch(setFilteredData(newFilteredData));

    if (selectedTags.includes(value)) {
      dispatch(setTags(selectedTags.filter((tag) => tag !== value)));
    } else {
      dispatch(setTags([...selectedTags, value]));
    }
    dispatch(setSearchText(""));
  };

  return (
    <div
      style={{
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          textAlign: "center",
          marginBottom: "15px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "widest",
        }}
      >
        Zime-Ai
      </h1>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Select
          mode="multiple"
          style={{ flex: 1, marginLeft: "5px" }}
          placeholder="Select tags..."
          value={selectedTags}
          onChange={handleChange}
        >
          {allTags.map((tag) => (
            <Select.Option key={tag.value} value={tag.value}>
              {tag.label}
            </Select.Option>
          ))}
        </Select>
        <Input.Search
          placeholder="Search by body"
          onChange={handleSearch}
          value={searchText}
          style={{ flex: 1, marginRight: "5px" }}
        />
      </div>

      <Table
        dataSource={filteredData}
        columns={columns(handleTagClick)}
        pagination={{
          ...pagination,
          total: filteredData.length,
          onChange: handlePaginationChange,
        }}
        scroll={{ x: true }}
        style={{ overflowX: "auto" }}
        className="responsive-table"
      />
    </div>
  );
};

export default Home;
