import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetails from "./pages/LessonDetails";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import QuizHome from "./pages/QuizHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import AIChatbot from "./components/AIChatbot";
import CompilerButton from "./components/CompilerButton";

function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");
  const location = useLocation();

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  // Hide chatbot on quiz pages
  const isQuizPage = location.pathname.startsWith("/quiz");
  const showChatbot = !isQuizPage;

  return (
    <>
      <Navbar />
      {children}
      <CompilerButton />
      {showChatbot && <AIChatbot />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            DASHBOARD
        ========================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =========================
            ALL LESSONS
        ========================= */}

        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />


        {/* =========================
            SINGLE LESSON
        ========================= */}

        <Route
          path="/lesson/:lessonNumber"
          element={
            <ProtectedRoute>
              <LessonDetails />
            </ProtectedRoute>
          }
        />


        {/* =========================
            QUIZ HOME
        ========================= */}

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizHome />
            </ProtectedRoute>
          }
        />


        {/* =========================
            LESSON QUIZ
        ========================= */}

        <Route
          path="/quiz/:lessonNumber"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
        {/* =========================
            PROGRESS
        ========================= */}

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />


        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;