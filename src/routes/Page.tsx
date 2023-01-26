import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { rawDataState } from "../state";
import { IRawData } from "../types";

import { Button, Typography, Descriptions, Image } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const renderLink = (content: string) => {
  if (content.startsWith("http")) {
    return (
      <a href={content} target="_blank">
        {content}
      </a>
    );
  }
  return <>{content}</>;
};

const TextContent = ({ content }: { content: string }) => (
  <>{renderLink(content)}</>
);
const ImageContent = ({ content }: { content: string }) => (
  <Image width={200} src={content} />
);
const renderContent = (key: string, content: string) => {
  switch (key) {
    case "og:image":
    case "twitter:image":
      return <ImageContent content={content} />;
    default:
      return <TextContent content={content} />;
  }
};

export const Page = () => {
  const { encodedUri } = useParams();
  const url = encodedUri ? decodeURIComponent(encodedUri) : null;
  const rawData = useRecoilValue(rawDataState) as IRawData;

  const page = useMemo(() => {
    if (!rawData || !url) {
      return;
    }

    return rawData.pages.find((page) => page.url === url);
  }, [rawData, url]);

  return (
    <div>
      <Link to={"/"}>
        <Button icon={<CaretLeftOutlined />}>Back</Button>
      </Link>
      {page && (
        <>
          <Title>{page?.metadata?.title ?? page.url}</Title>
          {page?.metadata?.title && (
            <Title level={3}>
              {page.url} ({page.status})
            </Title>
          )}
          {page.metadata && (
            <Descriptions
              bordered
              title="Base tags"
              column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
            >
              {Object.keys(page.metadata).map((key) => (
                <Descriptions.Item label={key} key={key}>
                  {renderContent(key, page.metadata[key])}
                </Descriptions.Item>
              ))}
            </Descriptions>
          )}
        </>
      )}
    </div>
  );
};
