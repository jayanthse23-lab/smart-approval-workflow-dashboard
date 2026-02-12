const StatCard = ({ title, value, variant }) => (
  <div className={`stat-card ${variant}`}>
    <p className="stat-title">{title}</p>
    <h3 className="stat-value">{value}</h3>
  </div>
);

export default StatCard;
