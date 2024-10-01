import { useContext, useState } from "react";
import "./AdminDashboardPage.scss";
import AdminSidebar from "../../../Components/admin/adminSidebar/AdminSidebar";
import DashboardSummary from "../../../Components/admin/dashboardSummary/DashboardSummary";
import { NavigationComponent, FooterComponent } from "../../../Components";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";

const AdminDashboardPage = () => {
  const [isActive, setIsActive] = useState(1);
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />

      <section
        className={` container mx-auto ${
          theme === "light" ? "text-gray-800" : "text-gray-800"
        }`}
      >
        <h4
          className={`text-3xl font-medium text-center pb-3 ${
            theme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          Admin Dashboard
        </h4>

        <div
          className={`flex gap-1 rounded-lg shadow-lg justify-between w-full ${
            theme === "light" ? "bg-gray-100" : "bg-gray-700"
          }`}
        >
          <div className="p-2">
            <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
          </div>

          <div className="p-2">
            <DashboardSummary isActive={isActive} />
          </div>
        </div>
      </section>
      <FooterComponent />
    </main>
  );
};

export default AdminDashboardPage;
