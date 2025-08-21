import { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.css";
import LoadingSpinner from "./components/Atoms/LoadingSpinner/LoadingSpinner";
import ErrorBoundary from "./components/Atoms/ErrorBoundary/ErrorBoundary";

const DashBoardPreview = lazy(
  () => import("./components/Templates/DashboardPreview/DashBoardPreview")
);
const PlanForm = lazy(() => import("./components/Organisms/PlanForm/PlanForm"));
const AddOnsForm = lazy(
  () => import("./components/Organisms/AddOnsForm/AddOnsForm")
);
const FinishingUp = lazy(
  () => import("./components/Organisms/FinishingUp/FinishingUp")
);
const ThankYou = lazy(() => import("./components/Organisms/ThankYou/ThankYou"));
const PersonalInfoForm = lazy(
  () => import("./components/Organisms/PersonalInfoForm/PersonalInfoForm")
);
const Home = lazy(() => import("./components/Templates/Home/Home"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <main className={styles.App}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<DashBoardPreview />}>
                <Route index element={<PersonalInfoForm />} />
                <Route path="select-plan" element={<PlanForm />} />
                <Route path="add-ons" element={<AddOnsForm />} />
                <Route path="finishing-up" element={<FinishingUp />} />
                <Route path="thank-you" element={<ThankYou />} />
              </Route>
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
