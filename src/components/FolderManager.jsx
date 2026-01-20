import { useState } from 'react';

const PASTEL_COLORS = [
  '#FFB4B4', '#FFD4B4', '#FFFAB4', '#C9F4AA', '#B4E7CE',
  '#B4D4FF', '#D4B4FF', '#FFB4E8', '#FFC4D0', '#E8C4FF'
];

const FolderManager = ({ folders, selectedFolder, onFolderChange, onAddFolder, onUpdateFolder, onDeleteFolder }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PASTEL_COLORS[0]);

  const handleAdd = () => {
    if (newFolderName.trim()) {
      onAddFolder({ name: newFolderName.trim(), color: selectedColor });
      setNewFolderName('');
      setSelectedColor(PASTEL_COLORS[0]);
      setIsAdding(false);
    }
  };

  return (
    <div className="folder-manager">
      <div className="folder-header">
        <h3>폴더</h3>
        <button className="folder-add-btn" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? '✕' : '+'}
        </button>
      </div>

      {isAdding && (
        <div className="folder-form">
          <input
            type="text"
            className="folder-input"
            placeholder="폴더 이름"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <div className="color-picker">
            {PASTEL_COLORS.map(color => (
              <button
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <button className="folder-submit-btn" onClick={handleAdd}>추가</button>
        </div>
      )}

      <div className="folder-list">
        <button
          className={`folder-item ${selectedFolder === 'all' ? 'active' : ''}`}
          onClick={() => onFolderChange('all')}
        >
          <span className="folder-icon">📁</span>
          <span className="folder-name">전체</span>
        </button>
        {folders.map(folder => (
          <button
            key={folder.id}
            className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
            onClick={() => onFolderChange(folder.id)}
          >
            <span className="folder-color" style={{ backgroundColor: folder.color }}></span>
            <span className="folder-name">{folder.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FolderManager;
