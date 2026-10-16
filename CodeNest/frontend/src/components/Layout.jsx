import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-layout">

      <aside className="sidebar">
        <div className="logo">
          <span className="logo-mark">{"</>"}</span>
          <span>CodeNest</span>
        </div>

        <nav className="nav-menu">
          <NavLink to="/" end>🏠 Dashboard</NavLink>
          <NavLink to="/lessons">📚 Lessons</NavLink>
          <NavLink to="/quiz">📝 Quiz</NavLink>
          <NavLink to="/progress">📈 Progress</NavLink>
          <NavLink to="/achievements">🏆 Achievements</NavLink>
          <NavLink to="/settings">⚙ Settings</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="avatar">A</div>
            <div>
              <strong>Student</strong>
              <small>CodeLearner</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div>
            <h2>Welcome back 👋</h2>
            <p>Continue your coding journey.</p>
          </div>

          <button className="profile-button">
            A
          </button>
        </header>

        <section className="page-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default Layout;