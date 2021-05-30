export interface NoteIterface {
  id: string;
  title: string;
  author: string;
  text: string;
  tags: Array<string>;
  important: Boolean;
  createDate: Date;
}
