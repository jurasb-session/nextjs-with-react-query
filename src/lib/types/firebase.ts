export interface Note {
  date: string;
  title: string;
}

export interface UpdateNote extends Note {
  key: string;
}
