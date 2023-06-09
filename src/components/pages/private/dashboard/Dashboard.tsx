import { Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedIn } from "../../../../store/slices";

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setLoggedIn(false));
  };
  return (
    <div>
      <Link to={"/"}>
        <Button onClick={handleClick}>Log Out</Button>
      </Link>
    </div>
  );
};

export default Dashboard;
