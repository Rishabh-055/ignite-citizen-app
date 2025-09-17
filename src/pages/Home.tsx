import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Instagram, Twitter, Facebook, Wrench, Car, Trash2, Lightbulb, TreePine, Building } from 'lucide-react';
import { issueService, Issue } from '@/api/services';

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await issueService.getIssues();
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const categories = [
    { name: 'Infrastructure', icon: Building, count: 12, path: '/dashboard?category=infrastructure' },
    { name: 'Roads', icon: Car, count: 8, path: '/dashboard?category=roads' },
    { name: 'Sanitation', icon: Trash2, count: 5, path: '/dashboard?category=sanitation' },
    { name: 'Lighting', icon: Lightbulb, count: 3, path: '/dashboard?category=lighting' },
    { name: 'Parks', icon: TreePine, count: 2, path: '/dashboard?category=parks' },
    { name: 'Utilities', icon: Wrench, count: 7, path: '/dashboard?category=utilities' },
  ];

  const totalReports = issues.length;
  const pendingReports = issues.filter(issue => issue.status === 'pending').length;
  const resolvedReports = issues.filter(issue => issue.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Make Your Community Better
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Report issues, track progress, and create positive change in your neighborhood
            </p>
            <Link to="/report-issue">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Report an Issue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-content-box border-none shadow-lg">
            <CardContent className="p-8">
              {/* Quick Reports by Category */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-content-box-foreground mb-6">
                  Quick Reports by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link key={category.name} to={category.path}>
                        <Card className="bg-secondary hover:bg-secondary-hover transition-colors cursor-pointer">
                          <CardContent className="p-4 text-center">
                            <Icon className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                            <h3 className="font-medium text-secondary-foreground text-sm mb-1">
                              {category.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {category.count}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Report Status */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-content-box-foreground mb-6">
                  Report Status
                </h2>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 bg-secondary p-2 sm:p-4 rounded-lg">
                  <Card className="bg-secondary">
                    <CardContent className="p-6 text-center">
                      <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
                        {totalReports}
                      </h3>
                      <p className="text-secondary-foreground">Total Reports Filed</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 text-center">
                      <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
                        {pendingReports}
                      </h3>
                      <p className="text-secondary-foreground">Pending</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
                        {resolvedReports}
                      </h3>
                      <p className="text-secondary-foreground">Completed/Resolved</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-content-box-foreground mb-6">
                  Recent Reports
                </h2>
                <div className="space-y-4">
                  {loading ? (
                    <p className="text-muted-foreground">Loading recent reports...</p>
                  ) : (
                    issues.slice(0, 5).map((issue) => (
                      <Card key={issue.id} className="bg-secondary">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-secondary-foreground mb-1">
                                {issue.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {issue.location}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(issue.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                issue.status === 'resolved' ? 'default' :
                                issue.status === 'in-progress' ? 'secondary' : 'outline'
                              }
                            >
                              {issue.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>

              {/* Community */}
              <div>
                <h2 className="text-2xl font-bold text-content-box-foreground mb-6">
                  Community
                </h2>
                <div className="flex items-center space-x-6">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-secondary-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-secondary-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-secondary-foreground hover:text-primary transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}