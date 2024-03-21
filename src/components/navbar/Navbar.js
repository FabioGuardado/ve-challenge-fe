"use client";

import { useState } from "react";

import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { List, ListItem, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import ROUTES from "@/constants/routes";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const small = useMediaQuery("(max-width:600px)");
  const full = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <div className={styles.navbarContainer}>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar variant="regular">
          {small && (
            <>
              <List>
                <ListItem>
                  <Button
                    className={styles.navbarCollapseButon}
                    onClick={handleClick}
                  >
                    <MenuIcon />
                  </Button>
                  <Typography
                    variant="h6"
                    className={styles.navbarText}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Registro de solicitudes
                  </Typography>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem>
                      <Link href={ROUTES.home} className={styles.navbarItem}>
                        Listado
                      </Link>
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </>
          )}

          {full && (
            <div className={styles.navbarFull}>
              <Typography variant="h6" className={styles.navbarText}>
                Registro de solicitudes
              </Typography>
              <Link href={ROUTES.home} className={styles.navbarItem}>
                Listado
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
