import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import ToDo from "./pages/ToDo";
import Tasks from "./pages/Tasks";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div>
      {/* <ToDo /> */}
      <Sidebar />

      <Tasks />
    </div>
  );
};

export default App;
