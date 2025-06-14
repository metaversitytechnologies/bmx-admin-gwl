// src/components/Main/Main.jsx
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useIt_Self_By_APP_URLQuery } from "../../../store/service/supermasteAccountStatementServices";
import Signin from "../signin/Signin";
import LayOut from "../../layout/LayOut";
import { protectedRoutes } from "./routes";

const Main = () => {
  let appUrl = window.location.hostname.split(".");
  appUrl.shift();
  appUrl = appUrl.join(".");

  const { data: logoData } = useIt_Self_By_APP_URLQuery(
    { appUrl },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const hostnamePart = window.location.hostname.split(".")[1];
    document.title = hostnamePart;

    if (logoData?.data?.favicon) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = logoData.data.favicon;
      document.head.appendChild(favicon);
    }
  }, [logoData?.data]);

  return (
    <Routes>
      <Route path="/" element={<Signin logo={logoData?.data?.logo} />} />
      <Route path="/signin" element={<Signin logo={logoData?.data?.logo} />} />

      <Route
        path=""
        element={<LayOut logoData={logoData} logo={logoData?.data?.logo} />}>
        {protectedRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Main;
