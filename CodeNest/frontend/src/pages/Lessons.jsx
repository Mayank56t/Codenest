import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Lessons() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username =
    localStorage.getItem("username") || "demoUser";

  useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    try {
      setLoading(true);
      setError("");

      const [lessonsResponse, progressResponse] =
        await Promise.all([
          fetch(
            `${API_BASE_URL}/api/lessons`
          ),
          fetch(
            `${API_BASE_URL}/api/progress/${username}`
          )
        ]);

      if (!lessonsResponse.ok) {
        throw new Error(
          "Unable to load lessons."
        );
      }

      const lessonsData =
        await lessonsResponse.json();

      let progressData = [];

      if (progressResponse.ok) {
        progressData =
          await progressResponse.json();
      }

      setLessons(lessonsData);
      setProgress(progressData);

    } catch (err) {
      console.error(
        "Lessons error:",
        err
      );

      setError(
        "Unable to load lessons. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function getProgress(lessonNumber) {
    return progress.find(
      (item) =>
        Number(item.lessonNumber) ===
        Number(lessonNumber)
    );
  }

  function openLesson(lessonNumber) {
    navigate(
      `/lesson/${Number(lessonNumber)}`
    );
  }

  function openQuiz(lessonNumber) {
    navigate(
      `/quiz/${Number(lessonNumber)}`
    );
  }

  const completedCount =
    lessons.filter((lesson) => {
      const lessonProgress =
        getProgress(
          lesson.lessonNumber
        );

      return (
        lessonProgress?.lessonCompleted ===
        true
      );
    }).length;

  return (
    <div className="lessons-page">

      {/* Header */}

      <section className="lessons-header">

        <div>

          <span className="welcome-badge">
            JAVA COURSE
          </span>

          <h1>
            Java Lessons
          </h1>

          <p>
            Learn Java step by step from the
            fundamentals to object-oriented
            programming.
          </p>

        </div>

        <div className="lessons-summary">

          <strong>
            {completedCount}/{lessons.length}
          </strong>

          <span>
            Lessons Completed
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
          Loading lessons...
        </div>
      )}


      {/* Lessons */}

      {!loading &&
        !error &&
        lessons.length > 0 && (

        <section className="lessons-grid">

          {lessons.map((lesson) => {

            const lessonProgress =
              getProgress(
                lesson.lessonNumber
              );

            const completed =
              lessonProgress?.lessonCompleted ===
              true;

            const score =
              lessonProgress?.quizScore ?? 0;

            const totalQuestions =
              lessonProgress?.totalQuestions ??
              5;

            const percentage =
              completed
                ? 100
                : lessonProgress
                ? Math.round(
                    (score /
                      totalQuestions) *
                      100
                  )
                : 0;

            return (
              <article
                className={
                  completed
                    ? "lesson-card completed"
                    : "lesson-card"
                }
                key={
                  lesson.id ||
                  lesson.lessonNumber
                }
              >

                {/* Number */}

                <div className="lesson-card-number">

                  {String(
                    lesson.lessonNumber
                  ).padStart(2, "0")}

                </div>


                {/* Content */}

                <div className="lesson-card-content">

                  <div className="lesson-card-top">

                    <span className="lesson-level">
                      {lesson.level}
                    </span>

                    {completed && (
                      <span className="completed-badge">
                        ✓ Completed
                      </span>
                    )}

                  </div>


                  <h2>
                    {lesson.title}
                  </h2>


                  <p>
                    {lesson.description}
                  </p>


                  {/* Progress */}

                  <div className="lesson-progress">

                    <div className="lesson-progress-info">

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
                          width:
                            `${percentage}%`
                        }}
                      />

                    </div>

                  </div>


                  {/* Buttons */}

                  <div className="lesson-actions">

                    <button
                      className="continue-button"
                      onClick={() =>
                        openLesson(
                          lesson.lessonNumber
                        )
                      }
                    >
                      {completed
                        ? "Review Lesson →"
                        : "Start Lesson →"}
                    </button>

                    <button
                      className="quiz-button"
                      onClick={() =>
                        openQuiz(
                          lesson.lessonNumber
                        )
                      }
                    >
                      Take Quiz
                    </button>

                  </div>

                </div>

              </article>
            );
          })}

        </section>
      )}


      {/* Empty State */}

      {!loading &&
        !error &&
        lessons.length === 0 && (

        <div className="empty-state">

          <h2>
            No lessons available
          </h2>

          <p>
            Add lessons from the backend
            database to see them here.
          </p>

        </div>
      )}

    </div>
  );
}

export default Lessons;