import { Company, Job } from "./db.js";

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unauthorized");
  }
}

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_root, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: async (_root, { input }, { user }) => {
      rejectIf(!user);

      // await delay(2000);

      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }) => {
      // check user is authenticated and job belongs to their company
      rejectIf(!user);

      const job = await Job.findById(id);

      rejectIf(job.companyId !== user.companyId);

      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user);

      const job = await Job.findById(input.id);

      rejectIf(job.companyId !== user.companyId);

      return Job.update({ ...input, companyId: user.companyId });
    },
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
