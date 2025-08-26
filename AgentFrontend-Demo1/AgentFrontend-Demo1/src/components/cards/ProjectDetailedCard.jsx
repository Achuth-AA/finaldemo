function ProjectDetailedCard({ projectData }) {
  const Icon = projectData.icon;
  const projectStatus = projectData?.status;

  return (
    <div className="p-4 bg-slate-50 rounded-xl shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon className="w-8 h-8 text-blue-600 p-2 rounded-full bg-blue-50" />
            )}
            <div>
              <p className="text-sm font-semibold">{projectData?.title}</p>
            </div>
          </div>
          <h3 className="text-sm text-slate-500">
            Project: <span>{projectData?.project}</span>{" "}
            <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block"></span>{" "}
            <span>{projectData?.access}</span>
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-lg text-blue-700 font-medium">
            {projectData?.overalProgress}
          </h3>
          <h3 className="text-sm text-slate-500">Overall Progress</h3>
        </div>
      </div>
      <div className="pt-6 pb-4">
        <div className="flex  justify-between items-center">
          <h3 className="text-sm text-black font-medium">Project Progress</h3>
          <h3 className="text-sm text-slate-500">
            {projectData?.stagesActive}
          </h3>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-orange-400 h-2 mt-2 rounded-full transition-all duration-300`}
            style={{ width: `${projectData?.projectProgress}` }}
          ></div>
        </div>
        <div className="flex justify-between p-2">
          {projectStatus.map((data) => (
            <div className="flex flex-col justify-center items-center mx-8" key={data.id}>
              <h3 className={`text-lg text-${data?.valueColor} font-medium`}>
                {data?.value}
              </h3>
              <h3 className="text-sm text-slate-500">{data?.type}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailedCard;
