import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Dashboard() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "demoUser";

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const lessonsResponse = await fetch(
        `${API_BASE_URL}/api/lessons`
      );

      const progressResponse = await fetch(
        `${API_BASE_URL}/api/progress/${username}`
      );

      if (!lessonsResponse.ok) {
        throw new Error("Failed to load lessons");
      }

      const lessonsData =
        await lessonsResponse.json();

      let progressData = [];

      if (progressResponse.ok) {
        progressData =
          await progressResponse.json();
      }

      setLessons(
        Array.isArray(lessonsData)
          ? lessonsData
          : []
      );

      setProgress(
        Array.isArray(progressData)
          ? progressData
          : []
      );

    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function getLessonProgress(
    lessonNumber
  ) {
    return progress.find(
      (item) =>
        Number(item.lessonNumber) ===
        Number(lessonNumber)
    );
  }

  const completedLessons =
    progress.filter(
      (item) =>
        item.lessonCompleted === true
    ).length;

  const totalLessons =
    lessons.length;

  const completionPercentage =
    totalLessons > 0
      ? Math.round(
          (completedLessons /
            totalLessons) *
            100
        )
      : 0;

  const totalQuestions =
    progress.reduce(
      (total, item) =>
        total +
        Number(item.totalQuestions || 0),
      0
    );

  const totalCorrect =
    progress.reduce(
      (total, item) =>
        total +
        Number(item.quizScore || 0),
      0
    );

  const averageScore =
    totalQuestions > 0
      ? Math.round(
          (totalCorrect /
            totalQuestions) *
            100
        )
      : 0;

  const displayedLessons =
    lessons.slice(0, 3);

  return (
    <div className="dashboard">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-text">

          <span className="welcome-badge">
            JAVA LEARNING PLATFORM
          </span>

          <h1>
            Learn Java.
            <br />
            <span>
              Build your skills.
            </span>
          </h1>

          <p>
            Learn Java concepts step by step,
            practice with quizzes, and build a
            strong foundation in programming.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/lessons")
            }
          >
            Start Learning →
          </button>

        </div>

        <div className="hero-code">

          <div className="code-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <pre>{`public class Main {

    public static void main(String[] args) {
        System.out.println("Hello, CodeNest!");
    }

}`}</pre>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            📚
          </div>

          <div>
            <span>
              Lessons
            </span>

            <strong>
              {loading
                ? "..."
                : totalLessons}
            </strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📝
          </div>

          <div>
            <span>
              Quizzes
            </span>

            <strong>
              {loading
                ? "..."
                : totalLessons * 5}
            </strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🎯
          </div>

          <div>
            <span>
              Average Score
            </span>

            <strong>
              {loading
                ? "..."
                : `${averageScore}%`}
            </strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📅
          </div>

          <div>
            <span>
              Completed
            </span>

            <strong>
              {loading
                ? "..."
                : completedLessons}
            </strong>
          </div>

        </div>

      </section>


      {/* CONTINUE LEARNING */}

      <section className="continue-section">

        <div className="section-heading">

          <div>

            <h2>
              Continue Learning
            </h2>

            <p>
              Pick up where you left off.
            </p>

          </div>

          <button
            className="view-all-button"
            onClick={() =>
              navigate("/lessons")
            }
          >
            View All →
          </button>

        </div>


        <div className="learning-grid">

          {displayedLessons.map(
            (lesson) => {

              const lessonProgress =
                getLessonProgress(
                  lesson.lessonNumber
                );

              const completed =
                lessonProgress?.lessonCompleted ===
                true;

              const lessonPercentage =
                completed
                  ? 100
                  : 0;

              return (
                <div
                  className="learning-card"
                  key={
                    lesson.id ||
                    lesson.lessonNumber
                  }
                >

                  <div className="learning-number">
                    {String(
                      lesson.lessonNumber
                    ).padStart(2, "0")}
                  </div>


                  <div className="learning-content">

                    <span className="learning-label">
                      LESSON{" "}
                      {String(
                        lesson.lessonNumber
                      ).padStart(2, "0")}
                    </span>

                    <h3>
                      {lesson.title}
                    </h3>

                    <p>
                      {lesson.description}
                    </p>


                    <div className="learning-progress">

                      <div className="progress-info">

                        <span>
                          Progress
                        </span>

                        <span>
                          {lessonPercentage}%
                        </span>

                      </div>

                      <div className="progress-bar">

                        <div
                          style={{
                            width: `${lessonPercentage}%`
                          }}
                        />

                      </div>

                    </div>


                    <button
                      className="continue-button"
                      onClick={() =>
                        navigate(
                          `/lesson/${lesson.lessonNumber}`
                        )
                      }
                    >
                      {completed
                        ? "Review Lesson →"
                        : "Start Lesson →"}
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>


      {/* OVERALL PROGRESS */}

      <section className="dashboard-progress-section">

        <div className="section-heading">

          <div>

            <h2>
              Your Progress
            </h2>

            <p>
              Keep going and complete all
              Java lessons.
            </p>

          </div>

          <strong>
            {completionPercentage}%
          </strong>

        </div>


        <div className="large-progress-bar">

          <div
            style={{
              width:
                `${completionPercentage}%`
            }}
          />

        </div>


        <div className="dashboard-progress-footer">

          <span>
            {completedLessons} of{" "}
            {totalLessons} lessons completed
          </span>

          <button
            className="view-all-button"
            onClick={() =>
              navigate("/progress")
            }
          >
            View Progress →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;