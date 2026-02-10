import { v4 as uuid } from "uuid";

export const sampleData = [
  {
    id: uuid(),
    title: "Arrays",
    subTopics: [
      {
        id: uuid(),
        title: "Basics",
        questions: [
          { id: uuid(), text: "Find the largest element" },
          { id: uuid(), text: "Reverse an array" },
        ],
      },
    ],
  },
];
