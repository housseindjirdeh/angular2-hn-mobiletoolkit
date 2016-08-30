export interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: Date;
  type: string;
}
