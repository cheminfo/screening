export interface Experiment {
  experiment: string;
  experimentNumber?: number;
  solvent: string;
  parameters?: Array<{ label: string; value: string }>;
}

export interface HolderRequest {
  user: string;
  name: string;
  title: string;
  experiments: Experiment[];
  holder: number;
}

export interface PlateRequest extends HolderRequest {
  plateNumber?: number;
  position: string;
}
