import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import PriorityInbox from "../pages/PriorityInbox";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/priority" element={<PriorityInbox />} />
    </Routes>
  );
}

export default AppRoutes;