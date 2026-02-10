import raw from "./dataset.json";
import { v4 as uuid } from "uuid";

export function transformDataset() {
  const questions = raw.data.questions;

  const topicMap = new Map();

  questions.forEach((q) => {
    const topicName = q.topic || "Miscellaneous";
    const subTopicName = q.subTopic || "General";

    // Create topic if not exists
    if (!topicMap.has(topicName)) {
      topicMap.set(topicName, {
        id: uuid(),
        title: topicName,
        subTopics: new Map(),
      });
    }

    const topic = topicMap.get(topicName);

    // Create sub-topic if not exists
    if (!topic.subTopics.has(subTopicName)) {
      topic.subTopics.set(subTopicName, {
        id: uuid(),
        title: subTopicName,
        questions: [],
      });
    }

    // Add question
    topic.subTopics.get(subTopicName).questions.push({
      id: uuid(),
      text: q.title,
      difficulty: q.questionId?.difficulty || "Medium",
      tags:
        q.questionId?.topics && q.questionId.topics.length > 0
          ? q.questionId.topics
          : [topicName],
      resource: q.resource || q.questionId?.problemUrl || "",
      isSolved: Boolean(q.isSolved),
    });
  });

  // Convert Maps → Arrays
  return Array.from(topicMap.values()).map((topic) => ({
    id: topic.id,
    title: topic.title,
    subTopics: Array.from(topic.subTopics.values()),
  }));
}
