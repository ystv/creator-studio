import React, { useState, useEffect } from "react";
import { Typography, Table } from "antd";
import Axios from "axios";
import { SeriesData } from "../../types/Series";
const { Title } = Typography;

const columns = (id: number) => {
  return [
    {
      title: "Name",
      dataIndex: "seriesName",
      key: `seriesName-${id}`,
    },
    {
      title: "description",
      dataIndex: "description",
      key: `description-${id}`,
    },
    {
      title: "url",
      dataIndex: "url",
      key: `url-${id}`,
    },
    {
      title: "ID",
      dataIndex: "seriesID",
      key: `id-${id}`,
    },
    {
      title: "depth",
      dataIndex: "depth",
      key: `depth-${id}`,
    },
  ];
};

const SeriesTable = () => {
  const [seriesData, setSeriesData] = useState<SeriesData[] | undefined>(
    undefined
  );
  useEffect(() => {
    Axios.request<SeriesData[]>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/series`,
      withCredentials: true,
    }).then((response) => {
      setSeriesData(response.data);
    });
  }, []);

  if (seriesData) {
    return <Table dataSource={seriesData} columns={columns(0)} />;
  }
  return <Table columns={columns(0)} />;
};

const Series = () => {
  return (
    <div>
      <Title>YSTV Series</Title>
      <SeriesTable />
    </div>
  );
};

export default Series;
