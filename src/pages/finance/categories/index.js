import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNotify } from "layouts/Notify";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// sweetalert2 components
import Swal from "sweetalert2";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import DataTable from "layouts/Tables/DataTable";

import { typeLabels } from "pages/finance/categories/schemas/options";

import categoryService from "services/category/categoryService";
import dataTableUtils from "utils/dataTableUtils";

function Categories() {

  const { values } = breakpoints;
  const { showSuccess, showError } = useNotify();
  const [menu, setMenu] = useState(null);
  const [categories, setCategories] = useState({ columns: [], rows: [] });
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      categoryService
            .getAllCategories()
            .then((data) => {
              const tableData = dataTableUtils.generateCategoriesTableData(data, removeHandler, editHandler);
              setCategories(tableData);
              setFilteredCategories(tableData.rows);
            })
            .catch((err) => {
              showError(err.message);
            });
    };
    fetchCategories();
  }, []);

  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false,
  });

  const removeHandler = (data) => {

  }

  const editHandler = (data) => {
    alert("edycja")
  }

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = (event) => setMenu(null);
  const handleFilter = (filterType) => {
    const filterCategories = (filterType) ? filteredCategories.filter(c => c.type == typeLabels[filterType]) : filteredCategories;
    setCategories(prev => ({
      ...prev,
      rows: filterCategories
    }));
    closeMenu();
  };

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={() => handleFilter("INCOME")}>Typ: Przychody</MenuItem>
      <MenuItem onClick={() => handleFilter("EXPENSE")}>Typ: Wydatki</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={() => handleFilter(null)}>
        <SoftTypography variant="button" color="error" fontWeight="regular">
          Usuń filtry
        </SoftTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={2}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                Kategorie
              </SoftTypography>
            </SoftBox>
          </Grid>  
        </Grid>
      </SoftBox>
      <SoftBox my={2}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Link to="/finance/categories/form">
            <SoftButton variant="gradient" color="info">
              Nowa kategoria
            </SoftButton>
          </Link>
          <SoftBox display="flex">
            <SoftButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              Filtry&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </SoftButton>
            {renderMenu}
          </SoftBox>
        </SoftBox>
        <Card>
          <DataTable table={categories} entriesPerPage={false} canSearch />
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default Categories;