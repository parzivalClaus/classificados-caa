import Bee from 'bee-queue';
import CreateCompanyMail from '../app/jobs/CreateCompanyMail';
import AdminUpdateCompanyMail from '../app/jobs/AdminUpdateCompanyMail';
import UserUpdateCompanyMail from '../app/jobs/UserUpdateCompanyMail';
import CreateUserMail from '../app/jobs/CreateUserMail';
import RecoveryPassMail from '../app/jobs/RecoveryPassMail';
import NewPassMail from '../app/jobs/NewPassMail';
import redisConfig from '../config/redis';

const jobs = [
  CreateCompanyMail,
  AdminUpdateCompanyMail,
  UserUpdateCompanyMail,
  CreateUserMail,
  RecoveryPassMail,
  NewPassMail,
];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
