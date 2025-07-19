export interface Bus {
  id: string;
  number: string;
  routeName: string;
  status: 'on-time' | 'delayed' | 'early' | 'off-route';
  location: {
    lat: number;
    lng: number;
  };
  destination: string;
  nextStop: string;
  estimatedArrival: string;
  capacity: number;
  occupancy: number;
  route: RouteStop[];
}

export interface RouteStop {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  estimatedTime: string;
  isCompleted: boolean;
}

// Mock bus data for demonstration
export const mockBuses: Bus[] = [
  {
    id: '1',
    number: '102',
    routeName: 'Downtown to Airport',
    status: 'on-time',
    location: { lat: 40.7831, lng: -73.9712 },
    destination: 'LaGuardia Airport',
    nextStop: 'Central Terminal',
    estimatedArrival: '2 mins',
    capacity: 50,
    occupancy: 32,
    route: [
      {
        id: 's1',
        name: 'Downtown Station',
        location: { lat: 40.7589, lng: -73.9851 },
        estimatedTime: 'Departed',
        isCompleted: true
      },
      {
        id: 's2',
        name: 'Midtown Plaza',
        location: { lat: 40.7614, lng: -73.9776 },
        estimatedTime: 'Departed',
        isCompleted: true
      },
      {
        id: 's3',
        name: 'Central Terminal',
        location: { lat: 40.7831, lng: -73.9712 },
        estimatedTime: '2 mins',
        isCompleted: false
      },
      {
        id: 's4',
        name: 'LaGuardia Airport',
        location: { lat: 40.7769, lng: -73.8740 },
        estimatedTime: '15 mins',
        isCompleted: false
      }
    ]
  },
  {
    id: '2',
    number: '205',
    routeName: 'University Loop',
    status: 'delayed',
    location: { lat: 40.7505, lng: -73.9934 },
    destination: 'University Campus',
    nextStop: 'Library Square',
    estimatedArrival: '8 mins',
    capacity: 45,
    occupancy: 28,
    route: [
      {
        id: 's5',
        name: 'Metro Station',
        location: { lat: 40.7505, lng: -73.9934 },
        estimatedTime: 'Current',
        isCompleted: false
      },
      {
        id: 's6',
        name: 'Library Square',
        location: { lat: 40.7549, lng: -73.9840 },
        estimatedTime: '8 mins',
        isCompleted: false
      },
      {
        id: 's7',
        name: 'University Campus',
        location: { lat: 40.7580, lng: -73.9855 },
        estimatedTime: '18 mins',
        isCompleted: false
      }
    ]
  },
  {
    id: '3',
    number: '308',
    routeName: 'Shopping District Express',
    status: 'early',
    location: { lat: 40.7282, lng: -73.9942 },
    destination: 'Grand Mall',
    nextStop: 'Fashion Avenue',
    estimatedArrival: '5 mins',
    capacity: 60,
    occupancy: 45,
    route: [
      {
        id: 's8',
        name: 'Business Center',
        location: { lat: 40.7282, lng: -73.9942 },
        estimatedTime: 'Current',
        isCompleted: false
      },
      {
        id: 's9',
        name: 'Fashion Avenue',
        location: { lat: 40.7369, lng: -73.9904 },
        estimatedTime: '5 mins',
        isCompleted: false
      },
      {
        id: 's10',
        name: 'Grand Mall',
        location: { lat: 40.7452, lng: -73.9857 },
        estimatedTime: '12 mins',
        isCompleted: false
      }
    ]
  },
  {
    id: '4',
    number: '421',
    routeName: 'Residential Circle',
    status: 'on-time',
    location: { lat: 40.7393, lng: -73.9885 },
    destination: 'Sunset Park',
    nextStop: 'Oak Street',
    estimatedArrival: '3 mins',
    capacity: 40,
    occupancy: 22,
    route: [
      {
        id: 's11',
        name: 'Maple Heights',
        location: { lat: 40.7393, lng: -73.9885 },
        estimatedTime: 'Current',
        isCompleted: false
      },
      {
        id: 's12',
        name: 'Oak Street',
        location: { lat: 40.7445, lng: -73.9823 },
        estimatedTime: '3 mins',
        isCompleted: false
      },
      {
        id: 's13',
        name: 'Sunset Park',
        location: { lat: 40.7489, lng: -73.9756 },
        estimatedTime: '10 mins',
        isCompleted: false
      }
    ]
  },
  {
    id: '5',
    number: '515',
    routeName: 'Waterfront Shuttle',
    status: 'off-route',
    location: { lat: 40.7230, lng: -74.0059 },
    destination: 'Harbor Point',
    nextStop: 'Pier 17',
    estimatedArrival: '12 mins',
    capacity: 35,
    occupancy: 18,
    route: [
      {
        id: 's14',
        name: 'Battery Park',
        location: { lat: 40.7030, lng: -74.0170 },
        estimatedTime: 'Departed',
        isCompleted: true
      },
      {
        id: 's15',
        name: 'Pier 17',
        location: { lat: 40.7230, lng: -74.0059 },
        estimatedTime: '12 mins',
        isCompleted: false
      },
      {
        id: 's16',
        name: 'Harbor Point',
        location: { lat: 40.7300, lng: -74.0001 },
        estimatedTime: '25 mins',
        isCompleted: false
      }
    ]
  }
];

// Helper functions for status styling
export const getStatusColor = (status: Bus['status']) => {
  switch (status) {
    case 'on-time':
      return 'success';
    case 'early':
      return 'accent';
    case 'delayed':
      return 'warning';
    case 'off-route':
      return 'destructive';
    default:
      return 'muted';
  }
};

export const getStatusText = (status: Bus['status']) => {
  switch (status) {
    case 'on-time':
      return 'On Time';
    case 'early':
      return 'Early';
    case 'delayed':
      return 'Delayed';
    case 'off-route':
      return 'Off Route';
    default:
      return 'Unknown';
  }
};

export const getOccupancyLevel = (occupancy: number, capacity: number) => {
  const percentage = (occupancy / capacity) * 100;
  if (percentage <= 30) return 'low';
  if (percentage <= 70) return 'medium';
  return 'high';
};