# Interactive Question Management Sheet

An interactive single-page web application that allows users to manage a hierarchical set of questions organized by topics and sub-topics.  
The application supports full CRUD operations, drag-and-drop reordering, and a clean, intuitive UI inspired by the Codolio platform.

This project was built as part of an assignment to demonstrate frontend architecture, state management, and API integration without a backend database.

---

## 🚀 Features

### Core Functionality
- Create, edit, and delete **Topics**
- Create, edit, and delete **Sub-topics**
- Create, edit, and delete **Questions**
- Drag-and-drop reordering of:
  - Topics
  - Sub-topics
  - Questions

### Technical Highlights
- Single Page Application (SPA)
- Multi-level drag-and-drop support
- Persistent state across page reloads
- Clean separation of UI, state, and API layers

---

## 🛠 Tech Stack

- **Frontend Framework:** React (Vite)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Drag & Drop:** @hello-pangea/dnd
- **Mock Backend:** localStorage-based CRUD APIs

---

## 🔌 Mock CRUD API Implementation (No Database)

To satisfy the requirement of API integration without using a database, the application implements a **mock backend API layer**.

### How it works:
- A dedicated API module simulates backend CRUD operations
- Data is stored and retrieved using `localStorage`
- All API methods are asynchronous to mimic real network behavior

### Supported Operations:
- **READ:** Load sheet data on application startup
- **CREATE / UPDATE:** Persist changes when topics, sub-topics, or questions are added, edited, or reordered
- **DELETE:** Remove topics, sub-topics, or questions

This approach closely mirrors real-world frontend–backend interaction without requiring a server or database.

---

## 📊 Initial Data

The application initializes its state using a provided sample dataset, which is transformed into the internal data structure on first load.

---

## 🌐 Live Deployment

https://interactive-question-management-she-delta.vercel.app/

## ▶️ Running the Project Locally

### Clone the repository
```bash
git clone https://github.com/bhavishyagupta11/interactive-question-management-sheet.git

## ▶️ Running the Project Locally

```bash
npm install
npm run dev

## 📋 Assignment Requirement Mapping

| Requirement | Status |
|------------|--------|
| Single Page Application | ✅ Implemented using React (Vite) |
| Add / Edit / Delete Topics | ✅ Implemented |
| Add / Edit / Delete Sub-topics | ✅ Implemented |
| Add / Edit / Delete Questions | ✅ Implemented |
| Drag-and-drop reordering | ✅ Implemented using @hello-pangea/dnd |
| State management | ✅ Implemented using Zustand |
| CRUD APIs without database | ✅ Implemented using mock APIs with localStorage |
| Sample dataset initialization | ✅ Implemented |
| Clean & intuitive UI | ✅ Codolio-inspired dark UI |
| Deployment link | ✅ Provided via Vercel |


