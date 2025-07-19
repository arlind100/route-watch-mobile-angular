import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Users, 
  Route,
  Smartphone,
  Wifi,
  Github
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track buses live on an interactive map with precise location data.'
    },
    {
      icon: Clock,
      title: 'Arrival Times',
      description: 'Get accurate estimated arrival times for all bus stops.'
    },
    {
      icon: Users,
      title: 'Occupancy Info',
      description: 'See how crowded buses are before you board.'
    },
    {
      icon: Route,
      title: 'Route Planning',
      description: 'View complete routes and plan your journey efficiently.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description: 'Optimized for mobile devices with a responsive design.'
    },
    {
      icon: Wifi,
      title: 'Offline Support',
      description: 'Access cached data even when connectivity is limited.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Bus Tracker</h1>
          <p className="text-primary-foreground/80">
            Your smart companion for public transportation
          </p>
          <Badge variant="secondary" className="mt-3">
            Version 1.0.0 (Prototype)
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* App Description */}
        <Card>
          <CardHeader>
            <CardTitle>About This App</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Bus Tracker is a modern, mobile-first application designed to make public 
              transportation more convenient and predictable. Track buses in real-time, 
              get accurate arrival times, and plan your journeys with confidence.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div>
          <h2 className="text-lg font-semibold mb-4 px-1">Key Features</h2>
          <div className="grid gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Mapbox GL', 'Vite'].map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Built with modern web technologies for optimal performance and user experience.
            </p>
          </CardContent>
        </Card>

        {/* Data Notice */}
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">
                  This is a prototype using mock data for demonstration purposes.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">
                  No personal data is collected or transmitted.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">
                  Future versions will integrate with Firebase for real-time data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Get Involved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This project is open source and welcomes contributions from developers and transit enthusiasts.
            </p>
            <Button variant="outline" className="w-full">
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;