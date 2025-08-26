import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import TestRunner from "./pages/TestRunner";
import Reports from "./pages/Reports";
import AgentGallery from "./pages/AgentGallery";
import Settings from "./pages/Settings";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AgentOutput from "./components/AgentOutput";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="test-runner" element={<TestRunner />} />
          <Route path="reports" element={<Reports />} />
          <Route path="agent-gallery" element={<AgentGallery />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/agent-output" element={<AgentOutput />} />
      </Routes>
    </Router>
  );
}

export default App;
