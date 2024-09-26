export type Project = {
  id: string | number;  // Allow id to be either a string or number
  name: string;
  description: string;
  status?: string;  // Optional status field
};


// setProjects(data.map((project: any) => ({
//   id: project._id,
//   name: project.name,
//   description: project.description,
//   status: 'In Progress' // or whatever the status logic is
// })));

// export default setProject



// export type Project = {
//   id: string;
//   name: string;
//   description: string;
//   status: string; // Add status if it's optional
// };

