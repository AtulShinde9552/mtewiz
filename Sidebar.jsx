import { Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import * as Icon from "react-bootstrap-icons";
import { logOut } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    const bearerToken = cookie.get("bearerToken");
    logOut(bearerToken);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Col lg={2} className="border-end p-4 vh-100 d-lg-block d-none">
        <h2 className="mb-5">SmartQC</h2>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Link to="/account/dashboard" className="text-decoration-none mb-3">
            <Icon.Display className="mb-1" /> Dashboard
          </Link>
          <Link to="/account/campaigns" className="text-decoration-none mb-3">
            <Icon.List className="mb-1" /> Campaigns
          </Link>
          <Link to="/account/user" className="text-decoration-none mb-3">
            <Icon.PersonFill className="mb-1" /> Users
          </Link>
          <Link to="/account/roles" className="text-decoration-none mb-3">
            <Icon.KeyFill className="mb-1" /> Roles
          </Link>
          <Link to="/account/payments" className="text-decoration-none mb-3">
            <Icon.CreditCardFill className="mb-1" /> Payments
          </Link>

          <span onClick={handleLogOut}>
            <Icon.Power className="mb-1" /> Sign Out
          </span>
        </Nav>
      </Col>
    </>
  );
}

export default NavigationBar;
