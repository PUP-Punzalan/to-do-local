import "bootstrap/dist/css/bootstrap.min.css";
import Tasks from "./pages/Tasks";
import "./styles/main.scss";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Tasks />
    </div>
  );
};

export default App;
