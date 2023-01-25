import { useMemo } from "react";
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
      [200, `${rawData.site}/`],
      ...rawData.pages
        .map((page): [number, string] => {
          return [page.status, page.url];
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
                    <a href={`/page/${encodeURIComponent(uri)}`}>
                      {uri.split(rawData!.site)[1]}
                    </a>
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
