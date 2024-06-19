import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashBoardView from "./views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccounterView from "./views/auth/ConfirmAccounterView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashBoardView />} index />
          <Route
            path="/projects/create"
            element={<CreateProjectView />}
            index
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsView />}
            index
          />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
            index
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccounterView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
