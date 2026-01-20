import { useState, useEffect } from 'react';
import { loadTodos, saveTodos, loadFolders, saveFolders } from '../utils/storage';
import { isToday, isThisWeek, isAfterThisWeek } from '../utils/dateUtils';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('today');
  const [selectedFolder, setSelectedFolder] = useState('all');

  useEffect(() => {
    setTodos(loadTodos());
    setFolders(loadFolders());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    saveFolders(folders);
  }, [folders]);

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now().toString(),
      ...todo,
      completed: false,
      createdAt: Date.now()
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addFolder = (folder) => {
    const newFolder = {
      id: Date.now().toString(),
      ...folder
    };
    setFolders([...folders, newFolder]);
  };

  const updateFolder = (id, updates) => {
    setFolders(folders.map(folder => 
      folder.id === id ? { ...folder, ...updates } : folder
    ));
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id));
    setTodos(todos.map(todo => 
      todo.folderId === id ? { ...todo, folderId: null } : todo
    ));
  };

  const getFilteredTodos = () => {
    let filtered = todos;

    // 카테고리 필터
    if (selectedCategory === 'today') {
      filtered = filtered.filter(todo => isToday(todo.dueDate));
    } else if (selectedCategory === 'week') {
      filtered = filtered.filter(todo => isThisWeek(todo.dueDate));
    } else if (selectedCategory === 'later') {
      filtered = filtered.filter(todo => isAfterThisWeek(todo.dueDate));
    }

    // 폴더 필터
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(todo => todo.folderId === selectedFolder);
    }

    return filtered;
  };

  const getTodayTodos = () => todos.filter(todo => isToday(todo.dueDate));

  const getCategoryCounts = () => ({
    today: todos.filter(todo => isToday(todo.dueDate)).length,
    week: todos.filter(todo => isThisWeek(todo.dueDate)).length,
    later: todos.filter(todo => isAfterThisWeek(todo.dueDate)).length
  });

  return {
    todos,
    folders,
    selectedCategory,
    selectedFolder,
    setSelectedCategory,
    setSelectedFolder,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    addFolder,
    updateFolder,
    deleteFolder,
    getFilteredTodos,
    getTodayTodos,
    getCategoryCounts
  };
};
