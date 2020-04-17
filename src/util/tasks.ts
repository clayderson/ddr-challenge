import debug from 'debug';
import schedule from 'node-schedule';
import Tabulation from '../models/Tabulation';
import Recording from '../models/Recording';
import Matching from '../models/Matching';

const logger = debug('challenge:tasks');

export default {
  run() {
    schedule.scheduleJob(process.env.MATCHINGS_CRON || '0 */6 * * *', async () => {
      const matchings = await Matching.find();
      const tabulations = await Tabulation.find();
      const recordings = await Recording.find();

      for (const matching of matchings) {
        for (let i = 0; i < tabulations.length; i += 1) {
          if (matching.tabulation.toString() === tabulations[i]._id.toString()) {
            tabulations.splice(i, 1);
            break;
          }
        }

        for (let i = 0; i < recordings.length; i += 1) {
          if (matching.recording.toString() === recordings[i]._id.toString()) {
            recordings.splice(i, 1);
            break;
          }
        }
      }

      for (const recording of recordings) {
        for (const tabulation of tabulations) {
          if (tabulation.binedPhone === recording.phone || tabulation.accessPhone === recording.phone) {
            Matching.create({
              recording: recording._id,
              tabulation: tabulation._id,
            });

            break;
          }
        }
      }

      logger(`Matching job run at ${new Date()}`);
    });

    logger(`All workers were initiated`);
  }
};
