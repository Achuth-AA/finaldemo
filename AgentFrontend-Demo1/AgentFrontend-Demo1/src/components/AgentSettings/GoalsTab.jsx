import GoalCard from "./GoalCard";
import { goalsData } from "./goalsData";

function GoalsTab() {
  return (
    <div className="space-y-6">
      {/* Primary Goals */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          🎯 Primary Goals
        </h3>
        
        <div className="space-y-4">
          {goalsData.primary.map((goal, index) => (
            <GoalCard key={index} goal={goal} isPrimary={true} />
          ))}
        </div>
      </div>

      {/* Secondary Goals */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          🎯 Secondary Goals
        </h3>
        
        <div className="space-y-4">
          {goalsData.secondary.map((goal, index) => (
            <GoalCard key={index} goal={goal} isPrimary={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoalsTab;