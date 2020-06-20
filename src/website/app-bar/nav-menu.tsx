import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { jump } from "../utils";

const useNavStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    lineHeight: "48px",
  },
}));

export const navItems = [
  ["Preview", "preview"],
  ["Typestate → AST", "typestate-ast"],
  ["AST → Automaton", "ast-doa"],
  ["Automaton → AST", "automaton-ast"],
  ["AST → Typestate", "ast-typestate"],
] as const;

export default function NavMenu() {
  const classes = useNavStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const makeItemClickHandler = (id: string) => () => {
    handleClose();
    jump(id);
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        aria-controls="nav-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {navItems.map((item, idx) => (
          <MenuItem
            key={idx}
            className={classes.menuItem}
            onClick={makeItemClickHandler(item[1])}
          >
            {item[0]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
