import JobList from "./JobList";
import { getJobs } from "../graphql/queries";
import { useState, useEffect } from "react";

function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // getJobs().then((jobs) => setJobs(jobs));
    getJobs().then(setJobs);
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
