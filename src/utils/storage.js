const TODOS_KEY = 'todos';
const FOLDERS_KEY = 'folders';

const DEFAULT_FOLDERS = [
  { id: 'work', name: '업무', color: '#FFB4B4' },
  { id: 'personal', name: '개인', color: '#B4D4FF' },
  { id: 'study', name: '공부', color: '#C9F4AA' }
];

export const loadTodos = () => {
  try {
    const data = localStorage.getItem(TODOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
};

export const loadFolders = () => {
  try {
    const data = localStorage.getItem(FOLDERS_KEY);
    if (data) {
      return JSON.parse(data);
    } else {
      saveFolders(DEFAULT_FOLDERS);
      return DEFAULT_FOLDERS;
    }
  } catch (error) {
    console.error('Failed to load folders:', error);
    return DEFAULT_FOLDERS;
  }
};

export const saveFolders = (folders) => {
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (error) {
    console.error('Failed to save folders:', error);
  }
};
