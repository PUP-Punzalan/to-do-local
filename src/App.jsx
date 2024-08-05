import "bootstrap/dist/css/bootstrap.min.css";
import Tasks from "./pages/Tasks";
import "./styles/main.scss";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Tasks />
    </div>
  );
};

export default App;
