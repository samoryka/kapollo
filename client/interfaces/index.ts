export interface Note {
  frequency: number;
  velocity?: number;
}

export type NoteCallback = (note: Note) => void;

export enum StreamEvent {
  CONNECTION = "connection",
  JOIN_STREAM = "join_stream",
  START_NOTE = "start_note",
  STOP_NOTE = "stop_note",
}