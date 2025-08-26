import MetricCard from "./MetricCard";

function MetricCardList({metricData}){
    return (
        <div className="flex items-center justify-center gap-4">
              {metricData.map((data) => {
                return (
                  <MetricCard
                    label={data.label}
                    values={data.values}
                    valueColor={data.valueColor}
                  />
                );
              })}
        </div>
    )
}

export default MetricCardList;