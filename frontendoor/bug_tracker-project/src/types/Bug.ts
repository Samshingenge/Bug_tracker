// Update your Bug type in the relevant file, e.g., @/types/Bug
// export type Bug = {
//   id: string | number;
//   title: string;
//   description: string;
//   priority: 'low' | 'medium' | 'high';  // Example of priority field
//   severity: 'low' | 'medium' | 'high';  // Add severity here
//   status?: string;  // Optional field
// };


export type Bug = {
  id: string | number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';  // Ensure these are lowercase
  severity: 'low' | 'medium' | 'high';  // Ensure these are lowercase
  status?: string;
};
