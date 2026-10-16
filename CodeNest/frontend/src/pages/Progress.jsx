import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Progress() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "demoUser";

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      setLoading(true);
      setError("");

      const [lessonsResponse, progressResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/api/lessons`),
          fetch(
            `${API_BASE_URL}/api/progress/${username}`
          )
        ]);

      if (!lessonsResponse.ok) {
        throw new Error("Failed to load lessons");
      }

      const lessonsData = await lessonsResponse.json();

      let progressData = [];

      if (progressResponse.ok) {
        progressData = await progressResponse.json();
      }

      setLessons(lessonsData);
      setProgress(progressData);

    } catch (err) {
      console.error("Progress error:", err);

      setError(
        "Unable to load your progress. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function getLessonProgress(lessonNumber) {
    return progress.find(
      (item) =>
        item.lessonNumber === lessonNumber
    );
  }

  const completedLessons = progress.filter(
    (item) => item.lessonCompleted === true
  ).length;

  const totalLessons = lessons.length;

  const totalQuestions = progress.reduce(
    (sum, item) =>
      sum + (item.totalQuestions || 0),
    0
  );

  const totalCorrect = progress.reduce(
    (sum, item) =>
      sum + (item.quizScore || 0),
    0
  );

  const averageScore =
    totalQuestions > 0
      ? Math.round(
          (totalCorrect / totalQuestions) * 100
        )
      : 0;

  const overallProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0;

  return (
    <div className="progress-page">

      {/* Header */}
      <section className="lessons-header">

        <div>
          <span className="welcome-badge">
            YOUR LEARNING
          </span>

          <h1>
            Progress
          </h1>

          <p>
            Track your Java learning journey
            and quiz performance.
          </p>
        </div>

        <div className="lessons-summary">

          <strong>
            {loading
              ? "..."
              : `${overallProgress}%`}
          </strong>

          <span>
            Course Progress
          </span>

        </div>

      </section>


      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {/* Loading */}
      {loading && (
        <div className="loading-message">
          Loading your progress...
        </div>
      )}


      {!loading && !error && (
        <>
          {/* Statistics */}
          <section className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon">
                📚
              </div>

              <div>
                <span>
                  Lessons Completed
                </span>

                <strong>
                  {completedLessons}/{totalLessons}
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
                  {averageScore}%
                </strong>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                📝
              </div>

              <div>
                <span>
                  Questions Attempted
                </span>

                <strong>
                  {totalQuestions}
                </strong>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                🏆
              </div>

              <div>
                <span>
                  Correct Answers
                </span>

                <strong>
                  {totalCorrect}
                </strong>
              </div>

            </div>

          </section>


          {/* Overall Progress */}
          <section className="dashboard-progress-section">

            <div className="section-heading">

              <div>
                <h2>
                  Overall Course Progress
                </h2>

                <p>
                  Complete every lesson to reach 100%.
                </p>
              </div>

              <strong>
                {overallProgress}%
              </strong>

            </div>


            <div className="large-progress-bar">

              <div
                style={{
                  width: `${overallProgress}%`
                }}
              />

            </div>


            <div className="dashboard-progress-footer">

              <span>
                {completedLessons} of{" "}
                {totalLessons} lessons completed
              </span>

            </div>

          </section>


          {/* Lesson Progress */}
          <section className="continue-section">

            <div className="section-heading">

              <div>
                <h2>
                  Lesson Progress
                </h2>

                <p>
                  View your progress for every lesson.
                </p>
              </div>

            </div>


            <div className="learning-grid">

              {lessons.map((lesson) => {

                const item =
                  getLessonProgress(
                    lesson.lessonNumber
                  );

                const completed =
                  item?.lessonCompleted === true;

                const score =
                  item?.quizScore ?? 0;

                const total =
                  item?.totalQuestions ?? 5;

                const percentage =
                  completed
                    ? 100
                    : item
                      ? Math.round(
                          (score / total) * 100
                        )
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
                            {percentage}%
                          </span>

                        </div>


                        <div className="progress-bar">

                          <div
                            style={{
                              width: `${percentage}%`
                            }}
                          />

                        </div>

                      </div>


                      <p>
                        Quiz Score:{" "}
                        <strong>
                          {score}/{total}
                        </strong>
                      </p>


                      <button
                        className="continue-button"
                        onClick={() =>
                          navigate(
                            `/quiz/${lesson.lessonNumber}`
                          )
                        }
                      >
                        {completed
                          ? "Retake Quiz →"
                          : "Take Quiz →"}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          </section>

        </>
      )}

    </div>
  );
}

export default Progress;