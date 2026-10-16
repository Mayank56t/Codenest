import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function QuizHome() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/lessons`
      );

      if (!response.ok) {
        throw new Error("Failed to load lessons");
      }

      const data = await response.json();

      setLessons(data);
    } catch (err) {
      console.error("Quiz home error:", err);

      setError(
        "Unable to load quizzes. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="quiz-home-page">

      {/* Header */}
      <section className="quiz-home-header">

        <span className="welcome-badge">
          JAVA PRACTICE
        </span>

        <h1>
          Java Quizzes
        </h1>

        <p>
          Test your knowledge after completing
          each Java lesson.
        </p>

      </section>


      {/* Loading */}
      {loading && (
        <div className="loading-message">
          Loading quizzes...
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {/* Quiz List */}
      {!loading && !error && (
        <section className="quiz-list">

          {lessons.map((lesson) => (
            <article
              className="lesson-card"
              key={
                lesson.id ||
                lesson.lessonNumber
              }
            >

              <div className="lesson-card-number">
                {String(
                  lesson.lessonNumber
                ).padStart(2, "0")}
              </div>


              <div className="lesson-card-content">

                <div className="lesson-card-top">

                  <span className="lesson-level">
                    {lesson.level}
                  </span>

                  <span className="completed-badge">
                    5 Questions
                  </span>

                </div>


                <h2>
                  {lesson.title}
                </h2>


                <p>
                  {lesson.description}
                </p>


                <button
                  className="continue-button"
                  onClick={() =>
                    navigate(
                      `/quiz/${lesson.lessonNumber}`
                    )
                  }
                >
                  Start Quiz →
                </button>

              </div>

            </article>
          ))}

        </section>
      )}


      {/* Empty */}
      {!loading &&
        !error &&
        lessons.length === 0 && (
          <div className="empty-state">

            <h2>
              No quizzes available
            </h2>

            <p>
              No lessons are currently
              available for quizzes.
            </p>

          </div>
        )}

    </div>
  );
}

export default QuizHome;