export interface NoteIterface {
  title: String;
  author: String;
  text: String;
  tags: Array<String>;
  important: Boolean;
  createDate: Date;
}
