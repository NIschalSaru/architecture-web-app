import { Fragment } from "react";
import "./assets/scss/index.scss";
import RouteConfig from "./routes/routerConfig";
import { App as AntdApp } from "antd";
// import Loading from "./components/Loading";

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate a delay to show the loader (e.g., API or resource loading)
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer); // Cleanup the timer
  // }, []);

  return (
    <Fragment>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <AntdApp notification={{ placement: "topRight" }}>
        <RouteConfig />
      </AntdApp>
      {/* )} */}
    </Fragment>
  );
}

export default App;
