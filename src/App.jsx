import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Main from "./component/common/main/Main";
import { notification } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let apiRef;
export const openNotification = (mess) => {
    apiRef?.success({
      message: mess,
      description: "Success",
      closeIcon: false,
      placement: "top",
    });
  };

export const openNotificationError = (mess) => {
    apiRef?.error({
      message: mess,
      closeIcon: false,
      placement: "top",
    });
  };
function App() {
  
  const [api,contextHolder ] = notification.useNotification();
  apiRef=api;
 
  
  return (
    <Provider store={store}>
      <div>
        {contextHolder}
        <Main />{" "}
      </div>
    </Provider>
  );
}

export default App;
