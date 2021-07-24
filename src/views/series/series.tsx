import React, { useState, useEffect } from "react";
import { Typography, Table } from "antd";
import { Series as s } from "../../api/api";
import { ISeries } from "../../types/Series";
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
      dataIndex: "id",
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
  const [seriesData, setSeriesData] = useState<ISeries[] | undefined>(
    undefined
  );
  useEffect(() => {
    s.getAllSeries()
    .then(res => {
      setSeriesData(res);
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
