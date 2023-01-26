import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Route, Routes } from "react-router-dom";

import type { IRawData } from "./types";

import { rawDataState } from "./state";
import { Dashboard } from "./routes/Dashboard";
import { Page } from "./routes/Page";

import { Layout } from "antd";
const { Footer, Content } = Layout;

type AppWindow = Window & typeof globalThis & { data: any };

const _window = window as AppWindow;

function App() {
  const setData = useSetRecoilState(rawDataState);

  useEffect(() => {
    const loadData = async () => {
      if (process.env.NODE_ENV === "development") {
        const dataJson = await import("./data.json");
        setData(dataJson.default as IRawData);
      } else {
        setData(_window.data);
      }
    };

    loadData();
  }, [setData]);

  return (
    <Layout>
      <Layout>
        <Content style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/page/:encodedUri" element={<Page />} />
          </Routes>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
