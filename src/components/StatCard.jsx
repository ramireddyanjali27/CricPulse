import { useEffect, useState } from 'react';
import './StatCard.css';

export default function StatCard({ value, label, icon: Icon, color, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(value) || 0;
    const duration = 1500;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  const formatted = typeof value === 'number' && !Number.isInteger(value)
    ? displayValue.toFixed(2)
    : Math.round(displayValue).toLocaleString();

  return (
    <div className="stat-card-custom" style={{ '--stat-color': color || 'var(--green-light)' }}>
      {Icon && (
        <div className="stat-card-custom__icon">
          <Icon size={20} />
        </div>
      )}
      <div className="stat-card-custom__value">
        {prefix}{formatted}{suffix}
      </div>
      <div className="stat-card-custom__label">{label}</div>
    </div>
  );
}
