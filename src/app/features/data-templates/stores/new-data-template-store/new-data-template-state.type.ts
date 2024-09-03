export type NewDataTemplateStateModel = {
  basicDetails:
    | {
        name: string | undefined;
        plot: { id: string; label: string } | undefined;
        workflow: { id: string; label: string } | undefined;
      }
    | undefined;

  plotOptions: { id: string; label: string }[];
  workflowOptions: { id: string; label: string }[];
};
