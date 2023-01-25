import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { rawDataState } from "../state";

export const Page = () => {
  const { encodedUri } = useParams();
  const url = encodedUri ? decodeURIComponent(encodedUri) : null;
  const rawData = useRecoilValue(rawDataState);

  const page = useMemo(() => {
    if (!rawData || !url) {
      return;
    }

    return rawData.pages.find((page) => page.url === url);
  }, [rawData, url]);

  return (
    <div>
      <Link to={"/"}>&lt; Back</Link>
      {page && (
        <>
          <h1>{page?.metadata?.title ?? page.url}</h1>
          <h2>{page?.metadata?.title && page.url}</h2>
          <h2>{page.status}</h2>
          {page.metadata && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(page.metadata).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{page.metadata[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};
