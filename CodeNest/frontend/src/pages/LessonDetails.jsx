import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function LessonDetails() {
  const { lessonNumber } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLesson();
  }, [lessonNumber]);

  async function loadLesson() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/lessons/${lessonNumber}`
      );

      if (!response.ok) {
        throw new Error("Lesson not found");
      }

      const data = await response.json();

      setLesson(data);
    } catch (err) {
      console.error("Lesson details error:", err);
      setError("Unable to load this lesson.");
    } finally {
      setLoading(false);
    }
  }

  function watchVideo() {
    if (!lesson?.videoUrl) {
      alert("Video is not available for this lesson yet.");
      return;
    }

    window.open(
      lesson.videoUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (loading) {
    return (
      <div className="lesson-details-page">
        <div className="loading-message">
          Loading lesson...
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="lesson-details-page">
        <div className="error-message">
          {error || "Lesson not found."}
        </div>

        <button
          className="continue-button"
          onClick={() => navigate("/lessons")}
        >
          Back to Lessons →
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-details-page">

      {/* Header */}
      <section className="lesson-details-header">

        <span className="welcome-badge">
          LESSON{" "}
          {String(lesson.lessonNumber).padStart(2, "0")}
        </span>

        <h1>
          {lesson.title}
        </h1>

        <p>
          {lesson.description}
        </p>

      </section>


      {/* Lesson Content */}
      <section className="lesson-details-content">

        {/* About */}
        <div className="lesson-info-card">

          <h2>
            About This Lesson
          </h2>

          <p>
            {lesson.description}
          </p>

        </div>


        {/* What You Will Learn */}
        <div className="lesson-info-card">

          <h2>
            What You Will Learn
          </h2>

          <p>
            In this lesson, you will learn the
            fundamental concepts of{" "}
            <strong>
              {lesson.title}
            </strong>.
          </p>

          <p>
            Read through the lesson carefully
            and watch the video before taking
            the quiz.
          </p>

        </div>


        {/* Lesson Information */}
        <div className="lesson-info-card">

          <h2>
            Lesson Information
          </h2>

          <p>
            <strong>
              Lesson Number:
            </strong>{" "}
            {lesson.lessonNumber}
          </p>

          <p>
            <strong>
              Difficulty:
            </strong>{" "}
            {lesson.level}
          </p>

          <p>
            <strong>
              Topic:
            </strong>{" "}
            {lesson.title}
          </p>

        </div>


        {/* Video Section */}
        <div className="lesson-quiz-card">

          <h2>
            WATCH & LEARN
          </h2>

          <p>
            Watch the recommended video to
            understand this lesson more easily.
          </p>

          <button
            className="primary-button"
            onClick={watchVideo}
          >
            ▶ Watch Video
          </button>

        </div>


        {/* Quiz CTA */}
        <div className="lesson-quiz-card">

          <h2>
            READY TO TEST YOUR KNOWLEDGE?
          </h2>

          <p>
            Take the quiz and check how well
            you understand this lesson.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              navigate(
                `/quiz/${lesson.lessonNumber}`
              )
            }
          >
            Take the Lesson Quiz →
          </button>

        </div>

      </section>

    </div>
  );
}

export default LessonDetails;