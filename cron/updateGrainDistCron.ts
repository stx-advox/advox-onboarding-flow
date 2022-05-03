import scheduler from "node-schedule";
import { GrainInfo } from "../models/GrainInfo";
import { getPoXInfo } from "../util/getPoXInfo";
import { getStackerData } from "../util/getStackerData";
import { sourcecred } from "sourcecred";
import { IGrainConfig } from "../types";
import path from "path";
import stringify from "json-stable-stringify";

const getGithubWriteInstance =
  sourcecred.instance.writeInstance.getGithubWriteInstance;
const sourcecredInstance = getGithubWriteInstance(
  process.env.GH_API_TOKEN,
  process.env.REPO,
  process.env.BRANCH
);

const GRAIN_PATH: Array<string> = ["config", "grain.json"];
const grainConfigPath = path.join(...GRAIN_PATH);

export const updateGrainDistCron = () => {
  scheduler.scheduleJob(
    "update the xBTC amount distributed each week, happens every monday",
    "0 0 * * 1",
    async () => {
      const infoData = await getPoXInfo();
      const [info] = await GrainInfo.find({}).exec();
      const lastCycleId = infoData.current_cycle.id - 1;
      if (!info) {
        await new GrainInfo({
          lastCycleId,
        }).save();
        return;
      }
      if (info.lastCycleId < lastCycleId) {
        const stackerData = await getStackerData(lastCycleId);
        const lastCycleRewards =
          stackerData.blockRewards.aggregate.sum.reward_amount;
        const xBTCTotal = lastCycleRewards * 0.998;
        const weekDistribution = xBTCTotal * 0.42;
        const grainConfig: IGrainConfig = JSON.parse(
          new TextDecoder().decode(
            await sourcecredInstance._writableStorage.get(grainConfigPath)
          )
        );
        const [allocation] = grainConfig.allocationPolicies;
        allocation.budget = weekDistribution.toString();
        const newConfig: IGrainConfig = {
          ...grainConfig,
          allocationPolicies: [allocation],
        };

        await sourcecredInstance._writableStorage.set(
          grainConfigPath,
          stringify(newConfig, { space: 2 })
        );

        info.lastCycleId = lastCycleId;
        await info.save();
      }
    }
  );
};
