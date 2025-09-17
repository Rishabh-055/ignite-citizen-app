import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react';
import { issueService, Issue } from '@/api/services';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await issueService.getIssues();
        setIssues(response.data);
        setFilteredIssues(response.data);
        
        // Set initial category filter from URL params
        const category = searchParams.get('category');
        if (category) {
          setCategoryFilter(category);
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [searchParams]);

  useEffect(() => {
    let filtered = issues;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }

    setFilteredIssues(filtered);
  }, [issues, searchTerm, statusFilter, categoryFilter]);

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
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

  const totalIssues = issues.length;
  const pendingIssues = issues.filter(issue => issue.status === 'pending').length;
  const inProgressIssues = issues.filter(issue => issue.status === 'in-progress').length;
  const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage community issues</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-primary mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold">{totalIssues}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingIssues}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressIssues}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{resolvedIssues}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="roads">Roads</SelectItem>
                  <SelectItem value="sanitation">Sanitation</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="parks">Parks</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <Card>
          <CardHeader>
            <CardTitle>Issues ({filteredIssues.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredIssues.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No issues found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(issue.status)}
                          <h3 className="font-semibold text-lg">{issue.title}</h3>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{issue.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>📍 {issue.location}</span>
                          <span>📂 {issue.category}</span>
                          <span>📅 {new Date(issue.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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