import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Main from "./component/common/main/Main";
import { notification } from "antd";
import "./assets/gaxon/styles.css";
import { useEffect } from "react";
import { themeName } from "./store/constant";

let apiRef;
export const openNotification = (mess) => {
  apiRef?.success({
    message: mess,
    description: "Success",
    closeIcon: false,
    placement: "top",
    duration: 1,
  });
};

export const openNotificationError = (mess) => {
  apiRef?.error({
    message: mess,
    closeIcon: false,
    placement: "top",
    duration: 1,
  });
};

function App() {
  const [api, contextHolder] = notification.useNotification();
  apiRef = api;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
  }, []);

  return (
    <Provider store={store}>
      <div>
        {contextHolder}
        <Main />
      </div>
    </Provider>
  );
}

export default App;
