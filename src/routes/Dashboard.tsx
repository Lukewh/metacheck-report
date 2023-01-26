import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { rawDataState } from "../state";
import { IPage, IRawData } from "../types";

import {
  Alert,
  Space,
  Table,
  Input,
  Statistic,
  Row,
  Col,
  Typography,
} from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
const { Search } = Input;
const { Title } = Typography;

export const Dashboard = () => {
  const rawData = useRecoilValue(rawDataState) as IRawData;
  const [filter, setFilter] = useState<string>();

  const pages: IPage[] = useMemo(() => {
    if (!rawData) {
      return [];
    }

    return rawData.pages.filter(
      (page) => !filter || (filter && page.url.includes(filter))
    );
  }, [rawData, filter]);

  const columns = [
    {
      title: "",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        return (
          <>
            {status === 200 && <CheckCircleTwoTone twoToneColor="#6D972E" />}
            {status !== 200 && (
              <CloseCircleTwoTone twoToneColor="#E45545" />
            )}{" "}
            {status}
          </>
        );
      },
    },
    {
      title: "Page",
      dataIndex: "display",
      key: "display",
      render: (text: string, page: IPage) => (
        <>
          {page.status === 200 ? (
            <Link to={`/page/${page.encodedURL}`}>{text}</Link>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: "Score",
      dataIndex: ["metadataAnalysis", "overall", "score"],
      key: "score",
      render: (percentage: number) => `${percentage.toFixed(0)}%`,
    },
  ];

  const none200 = useMemo(() => pages?.filter((page) => page.status !== 200), [
    pages,
  ]);

  const [lowThreshold, midThreshold, highThreshold] = useMemo(
    () =>
      pages?.reduce(
        (acc, page) => {
          const [low, mid, high] = acc;
          const score = page.metadataAnalysis.overall.score;

          if (page.status !== 200) {
            return acc;
          }

          if (score < 50) {
            low.push(page);
          } else if (score >= 50 && score < 75) {
            mid.push(page);
          } else {
            high.push(page);
          }

          return acc;
        },
        [[], [], []] as [IPage[], IPage[], IPage[]]
      ),
    [pages]
  );

  return (
    <div>
      <Title>{rawData && rawData.site}</Title>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={16}>
          {none200 && (
            <Col span={6}>
              <Alert
                type="error"
                description={
                  <Statistic title="Bad links" value={none200.length} />
                }
              />
            </Col>
          )}
          {lowThreshold && lowThreshold.length > 0 && (
            <Col span={6}>
              <Alert
                type="error"
                description={
                  <Statistic
                    title="Low metadata coverage"
                    value={lowThreshold.length ?? 0}
                  />
                }
              />
            </Col>
          )}
          {midThreshold && midThreshold.length > 0 && (
            <Col span={6}>
              <Alert
                type="warning"
                description={
                  <Statistic
                    title="Medium metadata coverage"
                    value={midThreshold.length ?? 0}
                  />
                }
              />
            </Col>
          )}
          {highThreshold && highThreshold.length > 0 && (
            <Col span={6}>
              <Alert
                type="success"
                description={
                  <Statistic
                    title="High metadata coverage"
                    value={highThreshold.length ?? 0}
                  />
                }
              />
            </Col>
          )}
        </Row>
        {pages && (
          <>
            <Search
              placeholder="Search url"
              onSearch={(str) => setFilter(str)}
              allowClear
              enterButton
            />
            <Table
              dataSource={pages}
              columns={columns}
              pagination={{ defaultPageSize: 50 }}
            />
          </>
        )}
      </Space>
    </div>
  );
};
