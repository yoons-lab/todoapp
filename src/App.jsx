import { useTodos } from './hooks/useTodos';
import Dashboard from './components/Dashboard';
import CategoryTabs from './components/CategoryTabs';
import FolderManager from './components/FolderManager';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const {
    folders,
    selectedCategory,
    selectedFolder,
    setSelectedCategory,
    setSelectedFolder,
    addTodo,
    toggleTodo,
    deleteTodo,
    addFolder,
    updateFolder,
    deleteFolder,
    getFilteredTodos,
    getTodayTodos,
    getCategoryCounts
  } = useTodos();

  const filteredTodos = getFilteredTodos();
  const todayTodos = getTodayTodos();
  const categoryCounts = getCategoryCounts();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">할일 관리</h1>
        <p className="app-subtitle">오늘도 화이팅! 💪</p>
      </header>

      <div className="app-container">
        <aside className="app-sidebar">
          <FolderManager
            folders={folders}
            selectedFolder={selectedFolder}
            onFolderChange={setSelectedFolder}
            onAddFolder={addFolder}
            onUpdateFolder={updateFolder}
            onDeleteFolder={deleteFolder}
          />
        </aside>

        <main className="app-main">
          <Dashboard todos={todayTodos} />

          <section className="todo-section">
            <TodoForm folders={folders} onAddTodo={addTodo} />
          </section>

          <section className="todo-section">
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              counts={categoryCounts}
            />
            <TodoList
              todos={filteredTodos}
              folders={folders}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
