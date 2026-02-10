const difficultyClassMap = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};

export default function Question({ question, fallbackTag, onToggleSolved }) {
  const difficulty = question.difficulty || "Medium";
  const tags =
    question.tags && question.tags.length > 0
      ? question.tags.slice(0, 3)
      : [fallbackTag];
  const difficultyClass = difficultyClassMap[difficulty] || "medium";

  return (
    <article className={`question-row ${question.isSolved ? "solved" : ""}`}>
      <div className="question-main">
        <button
          className={`status-dot ${question.isSolved ? "is-solved" : ""}`}
          type="button"
          aria-label={question.isSolved ? "Mark as unsolved" : "Mark as solved"}
          onClick={onToggleSolved}
        />
        <span className="question-name">{question.text}</span>
      </div>

      <div className="question-meta">
        <span className={`difficulty-pill ${difficultyClass}`}>{difficulty}</span>
        <a
          className={`resource-chip ${question.resource ? "" : "disabled"}`}
          href={question.resource || "#"}
          target="_blank"
          rel="noreferrer"
          aria-label="Open resource"
          onClick={(e) => {
            if (!question.resource) e.preventDefault();
          }}
        >
          yt
        </a>
        <div className="tag-group">
          {tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
        <span className="icon-btn" aria-hidden>
          star
        </span>
        <span className="icon-btn" aria-hidden>
          save
        </span>
      </div>
    </article>
  );
}
