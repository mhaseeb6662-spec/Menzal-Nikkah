import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetupWizard from "./pages/ProfileSetupWizard";
import Payment from "./pages/Payment";
import SearchProfiles from "./pages/SearchProfiles";
import ActiveProfiles from "./pages/ActiveProfiles";
import ProfileDetail from "./pages/ProfileDetail";
import SuccessStories from "./pages/SuccessStories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

import UserDashboardLayout from "./pages/user/UserDashboardLayout";
import Overview from "./pages/user/Overview";
import EditProfile from "./pages/user/EditProfile";
import Photos from "./pages/user/Photos";
import PaymentStatus from "./pages/user/PaymentStatus";
import Security from "./pages/user/Security";

import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import UserManagement from "./pages/admin/UserManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import AccessManagement from "./pages/admin/AccessManagement";
import SuccessStoriesManagement from "./pages/admin/SuccessStoriesManagement";
import WebsiteSettings from "./pages/admin/WebsiteSettings";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/active-profiles" element={<ActiveProfiles />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/search" element={<SearchProfiles />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Auth (no navbar/footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetupWizard />} />

          {/* User dashboard */}
          <Route path="/dashboard" element={<UserDashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="photos" element={<Photos />} />
            <Route path="payment-status" element={<PaymentStatus />} />
            <Route path="security" element={<Security />} />
          </Route>

          {/* Admin dashboard */}
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="access" element={<AccessManagement />} />
            <Route path="success-stories" element={<SuccessStoriesManagement />} />
            <Route path="settings" element={<WebsiteSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
