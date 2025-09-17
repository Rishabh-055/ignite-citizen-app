import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { issueService, Issue } from '@/api/services';

export default function Profile() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-01',
  };

  useEffect(() => {
    const fetchUserIssues = async () => {
      try {
        const response = await issueService.getIssues();
        // In a real app, you'd filter by user ID
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching user issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIssues();
  }, []);

  const totalReports = issues.length;
  const resolvedReports = issues.filter(issue => issue.status === 'resolved').length;
  const pendingReports = issues.filter(issue => issue.status === 'pending').length;

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in-progress':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Member since {new Date(user.joinDate).toLocaleDateString()}
          </p>
        </div>

        {/* Impact Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Your Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{totalReports}</h3>
                <p className="text-muted-foreground">Total Issues Reported</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{resolvedReports}</h3>
                <p className="text-muted-foreground">Issues Resolved</p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{pendingReports}</h3>
                <p className="text-muted-foreground">Pending Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Reported Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Your Reported Issues</CardTitle>
          </CardHeader>
          <CardContent>
            {issues.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No issues reported yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start making a difference by reporting your first issue!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(issue.status)}
                          <h3 className="font-semibold">{issue.title}</h3>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {issue.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            📍 {issue.location}
                          </span>
                          <span className="flex items-center">
                            📂 {issue.category}
                          </span>
                          <span className="flex items-center">
                            📅 {new Date(issue.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}