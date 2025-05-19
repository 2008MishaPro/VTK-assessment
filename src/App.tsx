import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Authorization } from "./pages/authorization/Authorization.tsx";

import { AuthOperator } from "./context/AuthContext";
import { TabsRoute } from "./pages/TabsRoute";
import { Index } from "./pages/(tabs)/profile";
import { SchedulePage } from "./pages/(tabs)/schedule/SchedulePage.tsx";
import { AssessmentsPage } from "./pages/(tabs)/assessments/AssessmentsPage.tsx";

function App() {
  return (
    <AuthOperator>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/authorized" replace />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/profile" element={<Index />} />
          <Route path="/authorized" element={<TabsRoute />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="/authorized/profile" element={<Index />} />
            <Route path="/authorized/assessment" element={<AssessmentsPage />} />
            <Route path="/authorized/schedule" element={<SchedulePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthOperator>
  );
}

export default App;
