import AddModal from "./AddModal";
import DeleteAllModal from "./DeleteAllModal";
import DoneAllModal from "./DoneAllModal";

const Sidebar = () => {
  return (
    <div className="sidebar--cont">
      <div className="side">
        <div className="top">
          <div className="logo--cont">
            <img
              src="https://lexmeet.com/images/logo/main.png"
              className="logo"
              alt="hello"
              height={20}
            />
          </div>
          <div className="actions--cont">
            <div className="title">
              <p className="sm semi-bold">Actions</p>
            </div>
            <div className="list">
              <AddModal />
              <DoneAllModal />
              <DeleteAllModal />
            </div>
          </div>
        </div>

        <div className="socials--cont">
          <a href="https://github.com/PUP-Punzalan" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/anrpunzalan/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
