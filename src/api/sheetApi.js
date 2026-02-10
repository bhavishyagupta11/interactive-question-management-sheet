const SHEET_STORAGE_KEY = "question-sheet-data";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSheet() {
  await delay();
  const raw = localStorage.getItem(SHEET_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveSheet(sheet) {
  await delay();
  localStorage.setItem(SHEET_STORAGE_KEY, JSON.stringify(sheet));
  return sheet;
}

export async function deleteSheet() {
  await delay();
  localStorage.removeItem(SHEET_STORAGE_KEY);
}
