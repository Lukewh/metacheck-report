import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { errorCodesState, rawDataState, tagCountState } from "../state";

export const Dashboard = () => {
  const rawData = useRecoilValue(rawDataState);
  const errorGroup = useRecoilValue(errorCodesState);
  const tagCount = useRecoilValue(tagCountState);

  const uris: [number, string][] = useMemo(() => {
    if (!rawData) {
      return [];
    }
    return [
      ...rawData.pages
        .map((page): [number, string] => {
          let url = page.url;
          // We need to ensure the root is clickable
          if (url === rawData.site) {
            url = `${url}/`;
          }
          return [page.status, url];
        })
        .sort((a, b) => a[1].localeCompare(b[1])),
    ];
  }, [rawData]);

  return (
    <div>
      {errorGroup && (
        <>
          <h1>Status</h1>
          {Object.keys(errorGroup).map((key) => {
            return (
              <div key={key}>
                <b>{key}</b>: {errorGroup[key].length}
              </div>
            );
          })}
        </>
      )}
      {tagCount && (
        <>
          <h1>Tag count</h1>
          {Object.keys(tagCount).map((key) => {
            return (
              <div key={key}>
                <b>{key}</b>: {tagCount[key].length}
              </div>
            );
          })}
        </>
      )}
      {uris && (
        <>
          <h1>All pages ({uris.length})</h1>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Page</th>
              </tr>
            </thead>
            <tbody>
              {uris.map(([status, uri]) => (
                <tr key={uri}>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        borderRadius: "8px",
                        backgroundColor: `${
                          status === 200 ? "#6D972E" : "#E45545"
                        }`,
                      }}
                    ></span>{" "}
                    {status}
                  </td>
                  <td>
                    {status === 200 ? (
                      <Link to={`/page/${encodeURIComponent(uri)}`}>
                        {`${uri.split(rawData!.site)[1]}`}
                      </Link>
                    ) : (
                      `${uri.split(rawData!.site)[1]}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
