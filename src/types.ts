export type Band = {
  name: string;
  recordLabel?: string;
};

export type MusicFestival = {
  name?: string;
  bands: Band[];
};
