import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Settings() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDeleteAccount() {
    if (!username) {
      navigate("/login", { replace: true });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your CodeNest account?\n\nYour account and all saved quiz progress will be permanently deleted."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/auth/delete?username=${encodeURIComponent(
          username
        )}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to delete your account."
        );
        return;
      }

      // Remove the logged-in user
      // from the browser.
      localStorage.removeItem("username");

      // Send the user back to login.
      navigate("/login", {
        replace: true
      });

    } catch (err) {
      console.error(
        "Delete account error:",
        err
      );

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    } finally {
      setDeleting(false);
    }
  }

  if (!username) {
    return (
      <div className="settings-page">
        <div className="settings-card">
          <h1>Account Settings</h1>

          <p>
            You are not logged in.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/login")
            }
          >
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">

      <section className="settings-header">
        <span className="welcome-badge">
          ACCOUNT
        </span>

        <h1>Settings</h1>

        <p>
          Manage your CodeNest account.
        </p>
      </section>

      <section className="settings-content">

        <div className="settings-card">
          <h2>Account Information</h2>

          <div className="account-info">
            <span>Username</span>

            <strong>
              {username}
            </strong>
          </div>
        </div>

        <div className="settings-card danger-zone">

          <div className="danger-header">
            <span className="danger-badge">
              DANGER ZONE
            </span>

            <h2>Delete Account</h2>
          </div>

          <p>
            Permanently delete your CodeNest
            account and all of your saved quiz
            progress.
          </p>

          <p className="danger-warning">
            This action cannot be undone.
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            className="delete-account-button"
            onClick={handleDeleteAccount}
            disabled={deleting}
          >
            {deleting
              ? "Deleting Account..."
              : "Delete My Account"}
          </button>

        </div>

      </section>

    </div>
  );
}

export default Settings;