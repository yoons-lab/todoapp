const CategoryTabs = ({ selectedCategory, onCategoryChange, counts }) => {
  const categories = [
    { id: 'today', label: '오늘', count: counts.today },
    { id: 'week', label: '이번주', count: counts.week },
    { id: 'later', label: '나중에', count: counts.later }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="category-label">{category.label}</span>
          <span className="category-count">{category.count}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
