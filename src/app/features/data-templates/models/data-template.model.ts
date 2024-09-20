import { Plot } from "@features/plots/models/plot.model";
import { Stage } from "@features/stages/models/stage.model";
import { Workflow } from "@features/workflows/models/workflow.model";

export type DataTemplate = {
  _id: string;
  currentHash: null | string;
  // 'officer on ground': {
  //   _id: '667c267dc173433445ad4461';
  //   collectionname: 'John Doe';
  //   contact: '123456789';
  //   dataid: '667c25dcc173433445ad4459';
  //   description: 'John Doe is a farmer is Kuforida';
  //   location: 'No 123, Nowhere, Kuforida';
  //   purpose: ['weeding', 'germination', 'harvesting'];
  //   type: 'Farmer';
  //   userid: 'u101';
  // };
  // 'plant name': 'Coconut A';
  // 'plant type': {
  //   _id: '66d89196b28fe102a3e320e4';
  //   collectionname: 'Coconut';
  //   contact: '123459989';
  //   dataid: '66d8916fb28fe102a3e320e2';
  //   description: 'Something..........';
  //   location: 'No 125, Nowhere, Kuforida';
  //   purpose: ['weeding', 'harvesting'];
  //   type: 'Plant';
  // };
  plot: Plot;
  prevHash: null | string;
  // 'soil health': 'Good';
  templateHash: string;
  templatename: string;
  timestamp: number;
  userid: string;
  // 'weather condition': 'Rainy';
  workflow: Workflow;
  stage: Stage
  geocoordinates: {
    latitude: number;
    longitude: number;
  }
};
