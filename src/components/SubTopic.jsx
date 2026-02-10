import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useSheetStore } from "../store/sheetStore";
import Question from "./Question";

export default function SubTopic({ topicId, topicTitle, sub, dragHandleProps }) {
  const addQuestion = useSheetStore((s) => s.addQuestion);
  const toggleQuestionSolved = useSheetStore((s) => s.toggleQuestionSolved);
  const [question, setQuestion] = useState("");

  return (
    <div className="subtopic-block">
      <div className="subtopic-title-row">
        <button className="drag-handle sub-drag" aria-label="Drag subtopic" {...dragHandleProps}>
          ::
        </button>
        <div className="subtopic-title">{sub.title}</div>
      </div>
      <Droppable droppableId={`questions:${topicId}:${sub.id}`} type="QUESTION">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {sub.questions.map((q, index) => (
              <Draggable key={q.id} draggableId={q.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Question
                      question={q}
                      fallbackTag={topicTitle}
                      onToggleSolved={() => toggleQuestionSolved(topicId, sub.id, q.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="inline-form question-form">
        <input
          placeholder="Add question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={() => {
            if (!question.trim()) return;
            addQuestion(topicId, sub.id, question.trim());
            setQuestion("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
