import React, { useState } from "react";
import OrgSidebar from "../components/OrgSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import OrgNavbar from "../components/OrgNavbar";

const OrganizationDashboard = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div>OrganizationDashboardLayout</div>
    </>
  );
};

export default OrganizationDashboard;
