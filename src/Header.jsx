import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEARCH from "./seacrh.png";
import PROFILE from "./profile.png";
import SETTING from "./setting.png";
import styled from "styled-components";
import "./navbar.css";

function Header({ navActive }) {
  /////// For Current Time ////////////////////
  const [currentTime, setCurrentTime] = useState(new Date());

  console.log("header");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format options for the hour and minute
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    // Other options can be added here, like second: 'numeric'
    // to display seconds as well.
  };

  /* Close the drawer when the user clicks outside of it */
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <>
      <Navbar.Wrapper>
        <Navbar.Logo>
          <div className="navright">
            <p>
              <span>
                <Link
                  to="/"
                  className={`${
                    navActive === "home" ? "hoverEffect" : "hoverEffect2"
                  }`}
                >
                  Call of Duty
                </Link>
              </span>
            </p>
            <p>
              <span>
                <Link
                  to="/gta"
                  className={`${
                    navActive === "gta" ? "hoverEffect" : "hoverEffect2"
                  }`}
                >
                  GTA
                </Link>
              </span>
            </p>
          </div>
        </Navbar.Logo>

        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          <Navbar.Item>
            <Link className="link" to="/menu">
              <img
                src={SEARCH}
                alt="search"
                style={{ width: "20px", height: "20px" }}
              />
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link className="link" to="/dining-rooms">
              <img
                src={SETTING}
                alt="setting"
                style={{ width: "20px", height: "20px" }}
              />
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link className="link" to="/dining-rooms">
              <img
                src={PROFILE}
                alt="setting"
                style={{
                  width: "23px",
                  height: "23px",
                  borderRadius: "50%",
                  marginTop: "-2px",
                }}
              />
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <span>
              <p style={{ color: "#fff" }}>
                {currentTime.toLocaleTimeString(undefined, timeOptions)}
              </p>
            </span>
          </Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
    </>
  );
}

//Styled Components
const Navbar = {
  Wrapper: styled.nav`
    position: fixed;
    z-index: 2;
    flex: 1;
    align-self: flex-start;
    padding: 1rem 1rem;
    height: 3rem;
    width: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 40em) {
      position: fixed;
      z-index: 2;
      width: 100vw;
      top: 0;
    }
  `,

  Logo: styled.h1`
    position: relative;
    top: 5px;
    padding: 0 1rem 0 0;
  `,

  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;
      width: 100px;
      height: 100%;
      flex-direction: column;

      background-color: grey;
      padding: 1rem 2.5rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,

  Item: styled.li`
    position: relative;
    top: 5px;
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `,
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 2rem;
    width: 2rem;
    position: relative;
    font-size: 10px;
    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
      color: black;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25px;
    }
  `,

  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: #000000;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `,
};

export default Header;
