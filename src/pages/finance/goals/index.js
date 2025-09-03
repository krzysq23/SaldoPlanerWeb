import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNotify } from "layouts/Notify";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Modal, Typography } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import ComplexProjectCard from "layouts/Cards/ProjectCards/ComplexProjectCard";
import PlaceholderCard from "layouts/Cards/PlaceholderCard";

import logoSlack from "assets/images/small-logos/logo-slack.svg";

import financialGoalService from "services/financialGoal/financialGoalService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Goals() {

  const [ financialGoals, setFinancialGoals ] = useState([]);
  const { showSuccess, showError } = useNotify();

  const fetchFinancialGoal = async () => {
    financialGoalService
          .getAllFinancialGoals()
          .then((data) => {
            setFinancialGoals(data);
          })
          .catch((err) => {
            showError(err.message);
          });
  };

  useEffect(() => {
    fetchFinancialGoal();
  }, []);

  const [menuState, setMenuState] = useState({ anchorEl: null, menuId: null });

  const openDropdownHandler = (event, id) => {
    setMenuState({
      anchorEl: event.currentTarget,
      menuId: id
    });
  };

  const closeDropdownHandler = () => {
    setMenuState({ anchorEl: null, menuId: null });
  };

  const editHandler = () => {
    console.log("Edytuj element:", menuState.menuId);
    closeDropdownHandler();
  };

  const removeHandler = () => {
    console.log("Usuń element:", menuState.menuId);
    closeDropdownHandler();
  };

  const renderMenu = () => (
    <Menu
      anchorEl={menuState.anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(menuState.anchorEl)}
      onClose={closeDropdownHandler}
      keepMounted
    >
      <MenuItem onClick={editHandler}>Edytuj</MenuItem>
      <MenuItem onClick={removeHandler}>Usuń</MenuItem>
    </Menu>
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <DashboardLayout>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            To jest okno modalne
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Możesz w nim umieścić dowolną treść.
          </Typography>
        </Box>
      </Modal>

      <DashboardNavbar />
      <SoftBox pt={5} pb={2}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <SoftBox mb={1}>
              <SoftTypography variant="h5">Cele finansowe</SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography variant="body2" color="text">
                Dzięki zakładce Cele finansowe łatwo wyznaczysz swoje priorytety, 
                ustalisz kwotę i termin, a aplikacja pokaże Ci postępy w drodze do celu.
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
        <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
          <Grid container spacing={3}>
            {financialGoals.map((goal) => (
              <Grid item xs={12} md={6} lg={4} key={goal.id}>
                <ComplexProjectCard
                  image={logoSlack}
                  title={goal.description}
                  description={goal.description}
                  dateTime={goal.deadline}
                  dropdown={{
                    action: (e) => openDropdownHandler(e, goal.id),
                    menu: renderMenu(),
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={4} sx={{ cursor: "pointer" }} onClick={handleOpen}>
              <PlaceholderCard title={{ variant: "h5", text: "Nowy Cel Finansowy" }} />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default Goals;