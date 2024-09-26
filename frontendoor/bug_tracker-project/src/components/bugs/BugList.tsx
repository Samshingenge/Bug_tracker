import React from 'react';
import { useBugs } from '../../hooks/useBugs';
import BugCard from './BugCard';

const BugList: React.FC = () => {
  const { bugs, loading, error } = useBugs();

  if (loading) return <div>Loading bugs...</div>;
  if (error) return <div>Error loading bugs: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bugs.map(bug => (
        <BugCard key={bug.id} bug={bug} />
      ))}
    </div>
  );
};

export default BugList;