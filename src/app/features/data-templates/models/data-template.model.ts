export type DataTemplate = {
  _id: string;
  'biodiversity clearance': string;
  'biodiversity verification': string;
  'farmer information': {
    contact: string;
    location: string;
    name: string;
    purpose: string[];
  };
  geolocation: string;
  plotid: string;
  templatename: string;
  timestamp: string;
  userid: string;
  'warehouse information': {
    contact: string;
    location: string;
    name: string;
    purpose: string[];
  };
};
