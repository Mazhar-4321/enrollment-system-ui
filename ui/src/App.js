import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { CourseDetail } from "../src/pages/CourseDetail";
import { UploadCourse2 } from "./pages/UploadCourse2";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from './Routes/ProtectedRoutes';
import AuthRoute from './Routes/AuthRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" exact element={<AuthRoute><LandingPage /></AuthRoute>} />
        <Route path="/CourseDetail" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/UpdateCourse2" element={<ProtectedRoute><UploadCourse2 /></ProtectedRoute>} />
        <Route path="/AdminDashBoard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      </Routes>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
