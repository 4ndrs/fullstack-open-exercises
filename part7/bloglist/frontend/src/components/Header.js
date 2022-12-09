import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";

import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  Button,
  useScrollTrigger,
  Slide,
  Fade,
  Fab,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";

import LoggedUser from "./LoggedUser";
import Notification from "./Notification";

const Header = () => {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <>
      <Notification />
      {loggedUser ? (
        <Navigation />
      ) : (
        <Typography align="center" variant="h3" mt={2}>
          Blog App
        </Typography>
      )}
    </>
  );
};

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    component={Link}
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    blogs
                  </Button>
                  <Button
                    component={Link}
                    to="/users"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    users
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={Link}
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                blogs
              </Button>
              <Button
                component={Link}
                to="/users"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                users
              </Button>
            </Box>
            <Box>
              <LoggedUser />
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop />
    </Fragment>
  );
};

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const ScrollTop = () => {
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Fab
        size="medium"
        aria-label="scroll back to top"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
};

export default Header;
