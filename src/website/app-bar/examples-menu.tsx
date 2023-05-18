import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";
import { useCopy } from "../utils";

const useExamplesStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    lineHeight: "48px",
  },
}));

const examples = {
  baseUrl: "https://typestate-editor.github.io/examples/",
  ext: ".protocol",
  list: [
    "Alice",
    "Bob",
    "Collection",
    "CProtocol",
    "Drone",
    "File",
    "Iterator",
    "DroppableIterator",
    "NodeA",
    "NodeB",
  ],
};

async function getExample(idx: number) {
  const selected = `${examples.list[idx]}${examples.ext}`;
  const url =
    location.hostname === "localhost"
      ? `/examples/${selected}`
      : `${examples.baseUrl}${selected}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.text();
}

export default function ExamplesMenu() {
  const classes = useExamplesStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const copy = useCopy();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const makeItemClickHandler = (item: string, idx: number) => () => {
    handleClose();

    let snackbarId: string | number | undefined = undefined;
    const timeoutId = setTimeout(() => {
      snackbarId = enqueueSnackbar(`Fetching example ${item}...`, {
        variant: "info",
        persist: true,
      });
    }, 1000);

    getExample(idx).then(
      text => {
        if (snackbarId) closeSnackbar(snackbarId);
        clearTimeout(timeoutId);
        copy(text, `Copied example ${item}!`);
      },
      err => {
        if (snackbarId) closeSnackbar(snackbarId);
        clearTimeout(timeoutId);
        enqueueSnackbar(`Could not fetch example ${item}`, {
          variant: "error",
        });
        console.error(err);
      }
    );
  };

  return (
    <div>
      <Button
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        aria-controls="nav-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Examples
      </Button>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {examples.list.map((item, idx) => (
          <MenuItem
            key={idx}
            className={classes.menuItem}
            onClick={makeItemClickHandler(item, idx)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
