import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useSheetStore } from "../store/sheetStore";
import SubTopic from "./SubTopic";

export default function Topic({ topic, dragHandleProps }) {
  const addSubTopic = useSheetStore((s) => s.addSubTopic);
  const deleteTopic = useSheetStore((s) => s.deleteTopic);
  const [subTitle, setSubTitle] = useState("");
  const [expanded, setExpanded] = useState(false);

  const totalQuestions = topic.subTopics.reduce(
    (acc, s) => acc + s.questions.length,
    0
  );
  const solvedQuestions = topic.subTopics.reduce(
    (acc, s) => acc + s.questions.filter((q) => q.isSolved).length,
    0
  );

  return (
    <section className="topic-section">
      <div className="topic-header">
        <div className="topic-title-wrap">
          <button className="drag-handle" aria-label="Drag topic" {...dragHandleProps}>
            ::
          </button>
          <h2>{topic.title}</h2>
          <span>
            {solvedQuestions} / {totalQuestions}
          </span>
        </div>
        <div className="topic-actions">
          <button
            className="danger-btn"
            onClick={() => deleteTopic(topic.id)}
            aria-label={`Delete ${topic.title}`}
          >
            Delete
          </button>
          <button
            className="collapse-btn"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Collapse topic" : "Expand topic"}
            aria-expanded={expanded}
          >
            <span className={`chevron ${expanded ? "expanded" : ""}`}>›</span>
          </button>
        </div>
      </div>
      {expanded && (
        <div className="topic-body">
          <Droppable droppableId={`subtopics:${topic.id}`} type="SUBTOPIC">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {topic.subTopics.map((sub, index) => (
                  <Draggable key={sub.id} draggableId={sub.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <SubTopic
                          topicId={topic.id}
                          topicTitle={topic.title}
                          sub={sub}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="inline-form">
            <input
              placeholder="Add sub-topic"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
            <button
              onClick={() => {
                if (!subTitle.trim()) return;
                addSubTopic(topic.id, subTitle.trim());
                setSubTitle("");
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
