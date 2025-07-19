import React from 'react';
import { Bus, getStatusColor, getStatusText, getOccupancyLevel } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  MapPin, 
  Route,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface BusDetailsProps {
  bus: Bus;
  onBack: () => void;
  onViewOnMap: () => void;
}

const BusDetails: React.FC<BusDetailsProps> = ({ bus, onBack, onViewOnMap }) => {
  const statusColor = getStatusColor(bus.status);
  const statusText = getStatusText(bus.status);
  const occupancyPercentage = (bus.occupancy / bus.capacity) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Bus {bus.number}</h1>
            <p className="text-sm text-muted-foreground">{bus.routeName}</p>
          </div>
          <Badge 
            variant="secondary"
            className={`text-xs font-medium bg-${statusColor}/10 text-${statusColor}`}
          >
            {statusText}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Next Stop</p>
                <p className="font-medium">{bus.nextStop}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ETA</p>
                <p className="font-medium text-primary">{bus.estimatedArrival}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-medium">{bus.destination}</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Occupancy
                </span>
                <span>{bus.occupancy}/{bus.capacity} passengers</span>
              </div>
              <Progress value={occupancyPercentage} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {occupancyPercentage.toFixed(0)}% capacity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Route Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bus.route.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    {stop.isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    {index < bus.route.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 ${
                        stop.isCompleted ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${
                        stop.isCompleted ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {stop.name}
                      </p>
                      <p className={`text-sm ${
                        stop.isCompleted 
                          ? 'text-muted-foreground' 
                          : stop.estimatedTime === 'Current'
                          ? 'text-primary font-medium'
                          : 'text-foreground'
                      }`}>
                        {stop.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={onViewOnMap}
            className="flex-1"
            variant="default"
          >
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;