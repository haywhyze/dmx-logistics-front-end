import React, { useContext } from "react";
import {
  Menu,
  Container,
  Icon,
  Image,
  Dropdown,
  Item,
  Button
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import Auth from "../auth";
import baseUrl from "../api/baseUrl";
import { ContextOrders } from "../components/context/Orders";

function Header(props) {
  if (useContext(ContextOrders)) {
    const { user } = useContext(ContextOrders);

    const trigger = (
      <span>
        <Icon name="user" />
        {user.userRole === "business"
          ? user.businessName
          : `Hello, ${user.firstName}`}
      </span>
    );

    const options = [
      {
        key: "user",
        text: (
          <span>
            Call us on <strong>08091234567</strong>
          </span>
        ),
        disabled: true
      },
      {
        key: "profile",
        text: (
          <Link as="a" to="/profile" style={{ color: "black", padding: 0 }}>
            My Profile
          </Link>
        )
      },
      {
        key: "faq",
        text: (
          <Link as="a" to="/faq" style={{ color: "black", padding: 0 }}>
            FAQ
          </Link>
        )
      },
      {
        key: "how-to-pay",
        text: (
          <Link as="a" to="/how-to-pay" style={{ color: "black", padding: 0 }}>
            How to Pay
          </Link>
        )
      },
      {
        key: "contact",
        text: (
          <Link as="a" to="/contact" style={{ color: "black", padding: 0 }}>
            Contact Us
          </Link>
        )
      },
      { key: "number", text: user.phoneNumber, disabled: true },
      {
        key: "sign-out",
        text: (
          <Item
            as="a"
            style={{ color: "black", padding: 0 }}
            onClick={() => Auth.signout(() => props.history.push("/login"))}
          >
            Sign Out
          </Item>
        )
      }
    ];

    return (
      <>
        <Menu fixed="top" inverted>
          <Container fluid>
            <NavLink to="/">
              <Menu.Item header>
                <Image
                  size="tiny"
                  src={`${baseUrl}/dmx-logo.jpg`}
                  style={{ marginRight: "1em" }}
                />
              </Menu.Item>
            </NavLink>

            <Menu.Menu position="right">
              {Auth.isAuthenticated() ? (
                <Dropdown item trigger={trigger} options={options} />
              ) : (
                <>
                  {props.location.pathname === "/login" && (
                    <Menu.Item>
                      <Link to="/register">
                        {" "}
                        <Button color="green">Sign up</Button>
                      </Link>
                    </Menu.Item>
                  )}
                  {props.location.pathname === "/register" && (
                    <Menu.Item>
                      <Link to="/login">
                        {" "}
                        <Button>Log-in</Button>{" "}
                      </Link>
                    </Menu.Item>
                  )}
                </>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    );
  }
  else return null
}

export default Header;
