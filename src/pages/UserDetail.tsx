import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Calendar, MapPin } from 'lucide-react';
import { userService, User } from '@/api/services';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError('No user ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await userService.getUser(parseInt(id));
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">User Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error || 'The user you\'re looking for doesn\'t exist.'}
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
        </div>

        {/* User Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage 
                  src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&id=${user.id}`} 
                  alt={user.name} 
                />
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{user.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>@{user.username}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="self-start">
                Active User
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-foreground">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Website</label>
                <p className="text-foreground">
                  {user.website ? (
                    <a 
                      href={`https://${user.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {user.website}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Username</label>
                <p className="text-foreground">@{user.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-foreground">#{user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                <Badge variant="default" className="ml-2">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Issues Reported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">8</div>
                <div className="text-sm text-muted-foreground">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">4</div>
                <div className="text-sm text-muted-foreground">Pending Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}