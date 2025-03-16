import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Authorization } from "./pages/Authorization";
import { AssessmentsPage } from "./pages/(tabs)/AssessmentsPage";
import { AuthOperator } from "./context/AuthContext";
import { TabsRoute } from "./pages/TabsRoute";
import { ProfilePage } from "./pages/(tabs)/ProfilePage";
import { SchedulePage } from "./pages/(tabs)/SchedulePage";

function App() {
  return (
    <AuthOperator>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/authorized" replace />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/authorized" element={<TabsRoute />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="assessment" element={<AssessmentsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthOperator>
  );
}

export default App;
