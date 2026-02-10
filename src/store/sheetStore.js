import { create } from "zustand";
import { transformDataset } from "../data/transformDataset";
import { getSheet, saveSheet } from "../api/sheetApi";

export const useSheetStore = create((set) => ({
  topics: [],

  loadSheet: async () => {
    const stored = await getSheet();

    if (Array.isArray(stored)) {
      set({ topics: stored });
      return;
    }

    const initialTopics = transformDataset();
    set({ topics: initialTopics });
    await saveSheet(initialTopics);
  },

  addTopic: async (title) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = [
        ...state.topics,
        { id: crypto.randomUUID(), title, subTopics: [] },
      ];
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  deleteTopic: async (topicId) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = state.topics.filter((t) => t.id !== topicId);
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  addSubTopic: async (topicId, title) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: [
                ...t.subTopics,
                { id: crypto.randomUUID(), title, questions: [] },
              ],
            }
          : t
      );
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  addQuestion: async (topicId, subId, text) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subId
                  ? {
                      ...s,
                      questions: [
                        ...s.questions,
                        {
                          id: crypto.randomUUID(),
                          text,
                          difficulty: "Medium",
                          tags: [t.title],
                          resource: "",
                          isSolved: false,
                        },
                      ],
                    }
                  : s
              ),
            }
          : t
      );
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  toggleQuestionSolved: async (topicId, subId, questionId) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = state.topics.map((t) => {
        if (t.id !== topicId) return t;
        return {
          ...t,
          subTopics: t.subTopics.map((s) => {
            if (s.id !== subId) return s;
            return {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId ? { ...q, isSolved: !q.isSolved } : q
              ),
            };
          }),
        };
      });
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  reorderTopics: async (from, to) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = Array.from(state.topics);
      const [moved] = updatedTopics.splice(from, 1);
      updatedTopics.splice(to, 0, moved);
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  reorderSubTopics: async (topicId, from, to) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = state.topics.map((t) => {
        if (t.id !== topicId) return t;
        const subTopics = Array.from(t.subTopics);
        const [moved] = subTopics.splice(from, 1);
        subTopics.splice(to, 0, moved);
        return { ...t, subTopics };
      });
      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },

  reorderQuestions: async (topicId, sourceSubId, destinationSubId, from, to) => {
    let updatedTopics = [];
    set((state) => {
      updatedTopics = state.topics.map((t) => {
        if (t.id !== topicId) return t;

        const sourceSubTopic = t.subTopics.find((s) => s.id === sourceSubId);
        if (!sourceSubTopic) return t;

        const sourceQuestions = Array.from(sourceSubTopic.questions);
        const [movedQuestion] = sourceQuestions.splice(from, 1);
        if (!movedQuestion) return t;

        if (sourceSubId === destinationSubId) {
          sourceQuestions.splice(to, 0, movedQuestion);
          return {
            ...t,
            subTopics: t.subTopics.map((s) =>
              s.id === sourceSubId ? { ...s, questions: sourceQuestions } : s
            ),
          };
        }

        return {
          ...t,
          subTopics: t.subTopics.map((s) => {
            if (s.id === sourceSubId) {
              return { ...s, questions: sourceQuestions };
            }
            if (s.id === destinationSubId) {
              const destinationQuestions = Array.from(s.questions);
              destinationQuestions.splice(to, 0, movedQuestion);
              return { ...s, questions: destinationQuestions };
            }
            return s;
          }),
        };
      });

      return { topics: updatedTopics };
    });
    await saveSheet(updatedTopics);
  },
}));
