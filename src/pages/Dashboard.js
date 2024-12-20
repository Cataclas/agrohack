import React from "react";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
    return (
        <div id="dashboard">
            <Header />
            <Dashboard />
            <Footer />
        </div>
    );
};

export default DashboardPage;
