import React from 'react';
import { Trash2, Upload, Share, Download } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'uploaded' | 'deleted' | 'shared' | 'downloaded';
  fileName: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    const iconProps = { className: "w-4 h-4", style: { color: '#737682' } };
    
    switch (type) {
      case 'uploaded':
        return <Upload {...iconProps} />;
      case 'deleted':
        return <Trash2 {...iconProps} />;
      case 'shared':
        return <Share {...iconProps} />;
      case 'downloaded':
        return <Download {...iconProps} />;
      default:
        return <Upload {...iconProps} />;
    }
  };

  const getActivityText = (type: ActivityItem['type']) => {
    switch (type) {
      case 'uploaded':
        return 'Uploaded';
      case 'deleted':
        return 'Deleted';
      case 'shared':
        return 'Shared';
      case 'downloaded':
        return 'Downloaded';
      default:
        return 'Unknown';
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  };

  // Show only the most recent activity of each type
  const getRecentActivityByType = () => {
    const recentActivities: ActivityItem[] = [];
    const types: ActivityItem['type'][] = ['deleted', 'shared', 'downloaded', 'uploaded'];
    
    types.forEach(type => {
      const activitiesOfType = activities
        .filter(activity => activity.type === type)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      if (activitiesOfType.length > 0) {
        recentActivities.push(activitiesOfType[0]);
      }
    });

    return recentActivities;
  };

  const recentActivities = getRecentActivityByType();

  if (recentActivities.length === 0) {
    return null;
  }

  return (
    <div className="mt-8" style={{ width: '1116px' }}>
      <h2 className="text-lg font-semibold mb-4 ml-1">Recent Activity</h2>
      <div className="ml-1">
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getActivityIcon(activity.type)}
                <span className="text-sm text-gray-700">
                  {getActivityText(activity.type)} {activity.fileName}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 