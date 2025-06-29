import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
// Add your imports here
import Homepage from "pages/homepage";
import Login from "pages/login";
import Register from "pages/register";
import PropertyDetail from "pages/property-detail";
import BookingConfirmation from "pages/booking-confirmation";
import BookingDetails from "pages/booking-details";
import BookingsPage from "pages/bookings";
import UserProfile from "pages/user-profile";
import Experiences from "pages/experiences";
import Services from "pages/services";
import BecomeHost from "pages/become-host";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/services" element={<Services />} />
        <Route path="/become-host" element={<BecomeHost />} />
        <Route path="/property-detail/:id" element={<PropertyDetail />} />
        <Route path="/booking-confirmation" element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        } />
        <Route path="/booking-details/:confirmationNumber" element={<BookingDetails />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/user-profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;