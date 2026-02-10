import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSheetStore } from "./store/sheetStore";
import Topic from "./components/Topic";
import "./App.css";

const parseSubTopicDroppableId = (id) => {
  const [, topicId] = id.split(":");
  return { topicId };
};

const parseQuestionDroppableId = (id) => {
  const [, topicId, subId] = id.split(":");
  return { topicId, subId };
};

export default function App() {
  const topics = useSheetStore((s) => s.topics);
  const loadSheet = useSheetStore((s) => s.loadSheet);
  const addTopic = useSheetStore((s) => s.addTopic);
  const reorderTopics = useSheetStore((s) => s.reorderTopics);
  const reorderSubTopics = useSheetStore((s) => s.reorderSubTopics);
  const reorderQuestions = useSheetStore((s) => s.reorderQuestions);

  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await loadSheet();
      if (mounted) {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [loadSheet]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === "TOPIC") {
      reorderTopics(source.index, destination.index);
    }

    if (type === "SUBTOPIC") {
      const { topicId: sourceTopicId } = parseSubTopicDroppableId(
        source.droppableId
      );
      const { topicId: destinationTopicId } = parseSubTopicDroppableId(
        destination.droppableId
      );
      if (sourceTopicId !== destinationTopicId) return;
      reorderSubTopics(sourceTopicId, source.index, destination.index);
    }

    if (type === "QUESTION") {
      const { topicId: sourceTopicId, subId: sourceSubId } =
        parseQuestionDroppableId(source.droppableId);
      const { topicId: destinationTopicId, subId: destinationSubId } =
        parseQuestionDroppableId(destination.droppableId);
      if (sourceTopicId !== destinationTopicId) return;
      reorderQuestions(
        sourceTopicId,
        sourceSubId,
        destinationSubId,
        source.index,
        destination.index
      );
    }
  };

  if (isLoading) {
    return (
      <div className="sheet-layout">
        <aside className="sheet-sidebar">
          <div className="sidebar-brand">BG</div>
        </aside>
        <div className="sheet-main">
          <header className="sheet-topbar">
            <div className="sheet-title">Interactive Question Tracker</div>
            <div className="topbar-actions">
              <div className="profile-pill">BG</div>
            </div>
          </header>
          <main className="sheet-content">
            <div className="content-header">
              <h1>Loading sheet...</h1>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="sheet-layout">
      <aside className="sheet-sidebar">
        <div className="sidebar-brand">BG</div>
      </aside>

      <div className="sheet-main">
        <header className="sheet-topbar">
          <div className="sheet-title">Interactive Question Tracker</div>
          <div className="topbar-actions">
            <div className="profile-pill">BG</div>
          </div>
        </header>

        <main className="sheet-content">
          <div className="content-header">
            <h1>Interactive Question Management Sheet</h1>
            <p>Track topics, organize questions, and practice in one place.</p>
          </div>

          <div className="add-topic-row">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new topic"
            />
            <button
              onClick={() => {
                if (!title.trim()) return;
                addTopic(title.trim());
                setTitle("");
              }}
            >
              Add Topic
            </button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="topics" type="TOPIC">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {topics.map((topic, index) => (
                    <Draggable
                      key={topic.id}
                      draggableId={topic.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Topic
                            topic={topic}
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
          </DragDropContext>
        </main>
      </div>
    </div>
  );
}
