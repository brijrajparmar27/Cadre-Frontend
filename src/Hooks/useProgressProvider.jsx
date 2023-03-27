const useProgresProvider = () => {
  const calculateProgress = (tasks) => {
    let totalTasks, taskStatuses;

    console.log(tasks);

    totalTasks = tasks.length;
    taskStatuses = tasks.map((each) => {
      return each.status;
    });

    const progressPoints = {
      pending: 0,
      running: 25,
      completed: 75,
      closed: 100,
    };

    let totalProgress = 0;
    for (let i = 0; i < totalTasks; i++) {
      const taskStatus = taskStatuses[i];
      if (progressPoints.hasOwnProperty(taskStatus)) {
        totalProgress += progressPoints[taskStatus];
      } else {
        // invalid status, assume 0 progress
        console.warn(`Invalid status: ${taskStatus}`);
      }
    }

    return totalProgress / totalTasks;
  };
  return { calculateProgress };
};

export default useProgresProvider;
