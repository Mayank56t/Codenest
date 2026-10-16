import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  function handleLogout() {
    localStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        CodeNest
      </div>

      <div className="navbar-links">

        <button
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/lessons")}
        >
          Lessons
        </button>

        <button
          onClick={() => navigate("/quiz")}
        >
          Quizzes
        </button>

        <button
          onClick={() => navigate("/progress")}
        >
          Progress
        </button>

        <button
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>

      </div>

      <div className="navbar-user">

        <span>
          {username || "Guest"}
        </span>

        {username ? (
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;