function AgentBadges({ badges }) {
  const getBorderColor = (text) => {
    switch (text) {
      case 'core': return 'border-blue-200';
      case 'critical': return 'border-red-200';
      case 'Assigned': return 'border-green-200';
      case 'working': return 'border-blue-200';
      case 'Active': return 'border-green-200';
      case 'integration': return 'border-green-200';
      case 'high': return 'border-orange-200';
      case 'medium': return 'border-yellow-200';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {badges.map((badge, index) => (
        <span
          key={index}
          className={`px-3 py-1 ${badge.bgColor} ${badge.textColor} text-xs rounded-full font-medium border ${getBorderColor(badge.text)}`}
        >
          {badge.text}
        </span>
      ))}
    </div>
  );
}

export default AgentBadges;