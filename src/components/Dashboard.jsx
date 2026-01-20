import { getToday, formatDateKorean, getDayOfWeekKorean } from '../utils/dateUtils';

const Dashboard = ({ todos }) => {
  const today = getToday();
  const todayTodos = todos.filter(todo => todo.dueDate === today);
  const completedCount = todayTodos.filter(todo => todo.completed).length;
  const totalCount = todayTodos.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const urgentTodos = todayTodos
    .filter(todo => !todo.completed && todo.dueTime)
    .sort((a, b) => a.dueTime.localeCompare(b.dueTime))
    .slice(0, 3);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">오늘의 일정</h2>
        <div className="dashboard-date">
          {formatDateKorean(today)} ({getDayOfWeekKorean(today)})
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">전체</div>
          <div className="stat-value">{totalCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">완료</div>
          <div className="stat-value completed">{completedCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">완료율</div>
          <div className="stat-value">{completionRate}%</div>
        </div>
      </div>

      {urgentTodos.length > 0 && (
        <div className="urgent-section">
          <h3 className="urgent-title">🔔 긴급 일정</h3>
          <div className="urgent-list">
            {urgentTodos.map(todo => (
              <div key={todo.id} className="urgent-item">
                <span className="urgent-time">{todo.dueTime}</span>
                <span className="urgent-text">{todo.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
