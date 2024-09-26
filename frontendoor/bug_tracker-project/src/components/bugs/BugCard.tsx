import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bug } from '@/types/Bug';

interface BugCardProps {
  bug: Bug;
}

const BugCard: React.FC<BugCardProps> = ({ bug }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{bug.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{bug.description}</p>
        <div className="flex justify-between items-center">
        <Badge variant={bug.priority === 'high' ? 'destructive' : bug.priority === 'medium' ? 'secondary' : 'outline'}>
          {bug.priority}
        </Badge>

          <span className="text-sm text-gray-500">{bug.status}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BugCard;