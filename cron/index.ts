import { bnsNameCron } from "./bnsNameCron";
// import { updateGrainDistCron } from "./updateGrainDistCron";

export const setupCronJobs = () => {
  bnsNameCron();
  // updateGrainDistCron();
};
