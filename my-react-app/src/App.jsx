import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Analytics from "./components/pages/Analytics";
import Settings from "./components/pages/Settings";

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  function toggleSidebar() {
    setSidebarToggle(!sidebarToggle);
  }

  function handleMenuClick(page) {
    setActivePage(page);
  }

  // Render the active page component
  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <Users />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar
        status={sidebarToggle}
        activePage={activePage}
        onMenuClick={handleMenuClick}
      />

      <div className="flex flex-col flex-1">
        <Header onSidebarToggle={toggleSidebar} />

        <main className="p-6 flex-1 overflow-auto bg-white shadow-inner">
          {renderPage()}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
