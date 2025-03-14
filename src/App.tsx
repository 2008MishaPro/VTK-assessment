import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Authorization } from "./pages/Authorization";
import { AssessmentsPage } from "./pages/AssessmentsPage";
import { AuthOperator } from "./context/AuthContext";
import { ProtectedRoute } from "./pages/ProtectionRoutes";

function App() {
  return (
    <AuthOperator>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/assessments" replace />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/assessments" element={<AssessmentsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthOperator>
  );
}

export default App;
