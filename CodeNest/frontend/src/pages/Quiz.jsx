import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Quiz() {
  const navigate = useNavigate();
  const { lessonNumber } = useParams();

  const username =
    localStorage.getItem("username") || "demoUser";

  const [questions, setQuestions] = useState([]);
  const [lesson, setLesson] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadQuiz();
  }, [lessonNumber]);

  async function loadQuiz() {
    try {
      setLoading(true);
      setError("");

      const [quizResponse, lessonResponse] =
        await Promise.all([
          fetch(
            `${API_BASE_URL}/api/quizzes/lesson/${lessonNumber}`
          ),
          fetch(
            `${API_BASE_URL}/api/lessons`
          )
        ]);

      if (!quizResponse.ok) {
        throw new Error("Unable to load quiz.");
      }

      const quizData =
        await quizResponse.json();

      let lessonsData = [];

      if (lessonResponse.ok) {
        lessonsData =
          await lessonResponse.json();
      }

      const currentLesson =
        lessonsData.find(
          (item) =>
            Number(item.lessonNumber) ===
            Number(lessonNumber)
        );

      setQuestions(quizData);
      setLesson(currentLesson || null);

      // Reset quiz
      setAnswers([]);
      setCurrentQuestion(0);
      setSelectedAnswer("");
      setScore(0);
      setSubmitted(false);
      setQuizFinished(false);

    } catch (err) {
      console.error("Quiz error:", err);

      setError(
        "Unable to load quiz. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function selectAnswer(answer) {
    if (submitted) {
      return;
    }

    setSelectedAnswer(answer);
  }

  function submitAnswer() {
    if (!selectedAnswer || submitted) {
      return;
    }

    const question =
      questions[currentQuestion];

    const isCorrect =
      selectedAnswer ===
      question.correctAnswer;

    /*
     * Store the answer.
     *
     * We intentionally DO NOT update score here.
     * The final score is calculated from `answers`
     * after all questions have been submitted.
     */

    setAnswers(
      (previousAnswers) => [
        ...previousAnswers,
        {
          questionId: question.id,
          selectedAnswer,
          correctAnswer:
            question.correctAnswer,
          correct: isCorrect
        }
      ]
    );

    setSubmitted(true);
  }

  async function nextQuestion() {
    if (!submitted) {
      return;
    }

    /*
     * If this is NOT the last question,
     * move to the next question.
     */

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      setSelectedAnswer("");
      setSubmitted(false);

      return;
    }

    /*
     * LAST QUESTION
     *
     * The last answer has already been added
     * to `answers` inside submitAnswer().
     *
     * Therefore we simply count all correct
     * answers here.
     *
     * DO NOT add selectedAnswer again.
     */

    const finalScore =
      answers.filter(
        (answer) => answer.correct
      ).length;

    console.log(
      "Final Score:",
      finalScore
    );

    console.log(
      "Total Questions:",
      questions.length
    );

    await saveProgress(finalScore);

    setScore(finalScore);
    setQuizFinished(true);
  }

  async function saveProgress(finalScore) {
    try {
      await fetch(
        `${API_BASE_URL}/api/progress`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            username,

            lessonNumber:
              Number(lessonNumber),

            lessonCompleted: true,

            quizScore: finalScore,

            totalQuestions:
              questions.length
          })
        }
      );

    } catch (err) {
      console.error(
        "Progress save error:",
        err
      );
    }
  }

  function retryQuiz() {
    loadQuiz();
  }

  function goToLessons() {
    navigate("/lessons");
  }

  function goToNextLesson() {
    const nextLesson =
      Number(lessonNumber) + 1;

    navigate(
      `/lesson/${nextLesson}`
    );
  }

  /*
   * Loading
   */

  if (loading) {
    return (
      <div className="quiz-page">

        <div className="loading-message">
          Loading quiz...
        </div>

      </div>
    );
  }

  /*
   * Error
   */

  if (error) {
    return (
      <div className="quiz-page">

        <div className="error-message">
          {error}
        </div>

        <button
          className="continue-button"
          onClick={loadQuiz}
        >
          Try Again
        </button>

      </div>
    );
  }

  /*
   * No Questions
   */

  if (questions.length === 0) {
    return (
      <div className="quiz-page">

        <section className="quiz-result-card">

          <span className="welcome-badge">
            QUIZ
          </span>

          <h1>
            No Questions Available
          </h1>

          <p>
            There are currently no quiz
            questions available for this
            lesson.
          </p>

          <button
            className="continue-button"
            onClick={goToLessons}
          >
            Back to Lessons →
          </button>

        </section>

      </div>
    );
  }

  /*
   * Quiz Finished
   */

  if (quizFinished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="quiz-page">

        <section className="quiz-result-card">

          <span className="welcome-badge">
            QUIZ COMPLETE
          </span>

          <h1>
            {percentage >= 80
              ? "Excellent Work!"
              : percentage >= 50
              ? "Good Job!"
              : "Keep Practicing!"}
          </h1>

          <p>
            You completed the quiz for{" "}

            <strong>
              {lesson?.title ||
                `Lesson ${lessonNumber}`}
            </strong>
            .
          </p>

          <div className="quiz-score">

            <strong>
              {score}/{questions.length}
            </strong>

            <span>
              {percentage}% Score
            </span>

          </div>

          <div className="quiz-result-actions">

            <button
              className="continue-button"
              onClick={retryQuiz}
            >
              Retry Quiz
            </button>

            <button
              className="quiz-button"
              onClick={goToLessons}
            >
              Back to Lessons
            </button>

            {Number(lessonNumber) < 6 && (
              <button
                className="primary-button"
                onClick={goToNextLesson}
              >
                Next Lesson →
              </button>
            )}

          </div>

        </section>

      </div>
    );
  }

  /*
   * Current Question
   */

  const question =
    questions[currentQuestion];

  const progressPercentage =
    Math.round(
      ((currentQuestion + 1) /
        questions.length) *
        100
    );

  const options = [
    {
      key: "A",
      text: question.optionA
    },
    {
      key: "B",
      text: question.optionB
    },
    {
      key: "C",
      text: question.optionC
    },
    {
      key: "D",
      text: question.optionD
    }
  ];

  /*
   * Quiz UI
   */

  return (
    <div className="quiz-page">

      {/* Header */}

      <section className="quiz-header">

        <div>

          <span className="welcome-badge">
            JAVA QUIZ
          </span>

          <h1>
            {lesson?.title ||
              `Lesson ${lessonNumber}`}
          </h1>

          <p>
            Test your understanding of
            this lesson.
          </p>

        </div>

        <div className="quiz-counter">

          <strong>
            {currentQuestion + 1}
          </strong>

          <span>
            / {questions.length}
          </span>

        </div>

      </section>


      {/* Progress */}

      <div className="quiz-progress">

        <div className="quiz-progress-info">

          <span>
            Question{" "}
            {currentQuestion + 1} of{" "}
            {questions.length}
          </span>

          <span>
            {progressPercentage}%
          </span>

        </div>

        <div className="large-progress-bar">

          <div
            style={{
              width: `${progressPercentage}%`
            }}
          />

        </div>

      </div>


      {/* Question */}

      <section className="quiz-card">

        <div className="quiz-question-number">
          QUESTION {currentQuestion + 1}
        </div>

        <h2>
          {question.question}
        </h2>


        {/* Options */}

        <div className="quiz-options">

          {options.map((option) => {

            const isSelected =
              selectedAnswer ===
              option.key;

            const isCorrect =
              submitted &&
              option.key ===
                question.correctAnswer;

            const isWrong =
              submitted &&
              isSelected &&
              option.key !==
                question.correctAnswer;

            let optionClass =
              "quiz-option";

            if (isSelected) {
              optionClass +=
                " selected";
            }

            if (isCorrect) {
              optionClass +=
                " correct";
            }

            if (isWrong) {
              optionClass +=
                " wrong";
            }

            return (
              <button
                key={option.key}
                className={optionClass}
                onClick={() =>
                  selectAnswer(
                    option.key
                  )
                }
                disabled={submitted}
              >

                <span className="option-letter">
                  {option.key}
                </span>

                <span className="option-text">
                  {option.text}
                </span>

              </button>
            );

          })}

        </div>


        {/* Feedback */}

        {submitted && (
          <div
            className={
              selectedAnswer ===
              question.correctAnswer
                ? "quiz-feedback correct"
                : "quiz-feedback wrong"
            }
          >

            {selectedAnswer ===
            question.correctAnswer
              ? "✓ Correct answer!"
              : `✗ Incorrect. The correct answer is ${question.correctAnswer}.`}

          </div>
        )}


        {/* Action */}

        <div className="quiz-actions">

          {!submitted ? (

            <button
              className="primary-button"
              onClick={submitAnswer}
              disabled={!selectedAnswer}
            >
              Submit Answer →
            </button>

          ) : (

            <button
              className="primary-button"
              onClick={nextQuestion}
            >
              {currentQuestion <
              questions.length - 1
                ? "Next Question →"
                : "Finish Quiz →"}
            </button>

          )}

        </div>

      </section>

    </div>
  );
}

export default Quiz;