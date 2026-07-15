export type Job = {
  id: string;
  title: string;
  employer: string;
  location: string;
  salary: string;
  stack: string[];
  /** The mono "why this matched" chip shown on the card. */
  matched: string;
};

// The demo deck for the hero. Small UK employers, real-feeling graduate roles.
export const JOBS: Job[] = [
  {
    id: "fettle-jse",
    title: "Junior Software Engineer",
    employer: "Fettle",
    location: "Leeds",
    salary: "£28–32k",
    stack: ["React", "TypeScript"],
    matched: "BSc Computer Science + React",
  },
  {
    id: "northbeam-gda",
    title: "Graduate Data Analyst",
    employer: "Northbeam Logistics",
    location: "Manchester",
    salary: "£26k",
    stack: ["SQL", "Python"],
    matched: "BSc Economics + SQL",
  },
  {
    id: "rill-fe",
    title: "Frontend Developer",
    employer: "Rill Studio",
    location: "Remote (UK)",
    salary: "£30k",
    stack: ["React", "Next.js"],
    matched: "Portfolio + React, Next.js",
  },
  {
    id: "cavendish-gpa",
    title: "Graduate Product Analyst",
    employer: "Cavendish Health",
    location: "Birmingham",
    salary: "£27k",
    stack: ["SQL", "Excel"],
    matched: "BSc Maths + SQL",
  },
  {
    id: "tessellate-jde",
    title: "Junior Data Engineer",
    employer: "Tessellate",
    location: "Leeds",
    salary: "£31k",
    stack: ["Python", "dbt"],
    matched: "BSc Computer Science + Python",
  },
];
