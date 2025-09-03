import { useEffect, useState } from "react";
import { useNotify } from "layouts/Notify";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Modal, Typography } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import FinancialGoalCard from "layouts/Cards/FinancialGoalCard";
import PlaceholderCard from "layouts/Cards/PlaceholderCard";

import Swal from 'sweetalert2'

import financialGoalService from "services/financialGoal/financialGoalService";

import FinancialGoalForm from "./form"

function Goals() {

  const [ financialGoals, setFinancialGoals ] = useState([]);
  const [ selectedGoal, setSelectedGoal ] = useState(null);
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

  const [menuState, setMenuState] = useState({ anchorEl: null, financialGoal: null });

  const openDropdownHandler = (event, goal) => {
    setMenuState({
      anchorEl: event.currentTarget,
      financialGoal: goal
    });
  };

  const closeDropdownHandler = () => {
    setMenuState({ anchorEl: null, financialGoal: null });
  };

  const editHandler = () => {
    closeDropdownHandler();
    setSelectedGoal(menuState.financialGoal);
    setOpenModal(true);
  };

  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false,
  });

  const removeHandler = () => {
    const goal = menuState.financialGoal;
    closeDropdownHandler();
    newSwal
      .fire({
        title: "Usuwanie kategori",
        html: `Czy na pewno chcesz usunąć cel:<br><b>${goal.name}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "USUŃ",
        cancelButtonText: "ANULUJ",
      })
      .then((result) => {
        if (result.isConfirmed) {
          financialGoalService
            .removeFinancialGoal(goal)
            .then((resp) => {
              showSuccess(`Cel ${goal.name} został usunięty.`);
              setFinancialGoals(prev => prev.filter(g => g.id !== goal.id));
            })
            .catch((err) => {
              showError(`Nie udało się usunąć celu: ${goal.name}`);
            });
        }
      });
  };

  const [openModal, setOpenModal] = useState(false);
  const closeModalHandler = () => setOpenModal(false);
  const newGoalHandler = () => {
    setSelectedGoal(null);
    setOpenModal(true);
  }
  const saveGoalHandler  = () => {
    fetchFinancialGoal();
    setOpenModal(false);
  }

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

  return (
    <DashboardLayout>
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
                <FinancialGoalCard
                  financialGoal={goal}
                  dropdown={{
                    action: (e) => openDropdownHandler(e, goal),
                    menu: renderMenu(),
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={4} onClick={newGoalHandler}>
              <PlaceholderCard title={{ variant: "h5", text: "Nowy Cel Finansowy" }} />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Modal open={openModal} onClose={closeModalHandler}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          outline: "none !important",
          boxShadow: 24,
          borderRadius: "1rem !important",
          p: 4
        }}>
          <FinancialGoalForm financialGoal={selectedGoal} onClose={closeModalHandler} onSave={saveGoalHandler}  />
        </Box>
      </Modal>
      <Footer />
    </DashboardLayout>
      );
}

export default Goals;