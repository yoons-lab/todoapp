import { useState } from 'react';
import { getToday } from '../utils/dateUtils';

const TodoForm = ({ folders, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [dueDate, setDueDate] = useState(getToday());
  const [dueTime, setDueTime] = useState('');
  const [folderId, setFolderId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo({
      title: title.trim(),
      memo: memo.trim(),
      dueDate,
      dueTime,
      folderId: folderId || folders[0]?.id || null
    });

    setTitle('');
    setMemo('');
    setDueDate(getToday());
    setDueTime('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input form-input-title"
          placeholder="할 일을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-input form-textarea"
          placeholder="메모 (선택사항)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows="2"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">날짜</label>
          <input
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">시간</label>
          <input
            type="time"
            className="form-input"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">폴더</label>
          <select
            className="form-input"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
          >
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="form-submit-btn">
        추가하기
      </button>
    </form>
  );
};

export default TodoForm;
