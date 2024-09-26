// hooks/useBugs.ts
import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { Bug } from '../types/Bug';

export const useBugs = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const data = await request('get', '/bugs');
      setBugs(data);
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to fetch bugs');
        console.error('Failed to fetch bugs:', error.message);
      } else {
        setError('Failed to fetch bugs: Unknown error');
        console.error('Failed to fetch bugs: Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const createBug = async (bugData: Omit<Bug, 'id'>) => {
    try {
      const newBug = await request('post', '/bugs', bugData);
      setBugs([...bugs, newBug]);
      return newBug;
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to create bug');
        console.error('Failed to create bug:', error.message);
      } else {
        setError('Failed to create bug: Unknown error');
        console.error('Failed to create bug: Unknown error');
      }
      throw error;
    }
  };

  const updateBug = async (id: string, bugData: Partial<Bug>) => {
    try {
      const updatedBug = await request('put', `/bugs/${id}`, bugData);
      setBugs(bugs.map(bug => bug.id.toString() === id ? updatedBug : bug)); // Convert bug.id to string for comparison
      return updatedBug;
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to update bug');
        console.error('Failed to update bug:', error.message);
      } else {
        setError('Failed to update bug: Unknown error');
        console.error('Failed to update bug: Unknown error');
      }
      throw error;
    }
  };

  const deleteBug = async (id: string) => {
    try {
      await request('delete', `/bugs/${id}`);
      setBugs(bugs.filter(bug => bug.id.toString() !== id)); // Convert bug.id to string for comparison
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to delete bug');
        console.error('Failed to delete bug:', error.message);
      } else {
        setError('Failed to delete bug: Unknown error');
        console.error('Failed to delete bug: Unknown error');
      }
      throw error;
    }
  };

  return { bugs, loading, createBug, updateBug, deleteBug, refetch: fetchBugs, error };
};
