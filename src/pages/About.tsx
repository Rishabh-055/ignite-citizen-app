import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Heart, Award } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Community Manager',
      description: 'Passionate about connecting communities and making positive change.',
    },
    {
      name: 'Mike Chen',
      role: 'Technical Lead',
      description: 'Building technology that empowers citizens to improve their neighborhoods.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      description: 'Creating user-friendly experiences that make civic engagement accessible.',
    },
  ];

  const stats = [
    { label: 'Issues Resolved', value: '1,250+', icon: Award },
    { label: 'Active Users', value: '5,000+', icon: Users },
    { label: 'Communities Served', value: '25+', icon: Target },
    { label: 'Years of Service', value: '3+', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Our Mission</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            We believe that every community deserves to be heard. Our platform connects citizens 
            with local authorities to create positive change, one issue at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-content-box">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-content-box-foreground mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're dedicated to bridging the gap between communities and local governments. 
                Through our platform, citizens can easily report issues, track their resolution, 
                and see the direct impact of their civic engagement.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                From broken streetlights to potholes, from park maintenance to public safety 
                concerns – every issue matters, and every voice deserves to be heard.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1">Transparency</Badge>
                <Badge variant="secondary" className="px-3 py-1">Community</Badge>
                <Badge variant="secondary" className="px-3 py-1">Innovation</Badge>
                <Badge variant="secondary" className="px-3 py-1">Impact</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-secondary">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-secondary-foreground mb-2">Community First</h3>
                  <p className="text-sm text-muted-foreground">
                    Every decision we make prioritizes community needs and citizen voices.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-secondary">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-secondary-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-secondary-foreground mb-2">Results Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    We measure success by the positive changes we help create in communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-content-box">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-content-box-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind the platform, working to make communities better.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-card">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of citizens who are already making their communities better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/report-issue"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Report Your First Issue
            </a>
            <a
              href="/dashboard"
              className="border border-primary-foreground text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}