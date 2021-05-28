export class Note {
  title: String;
  author: String;
  text: String;
  tags: Array<String>;
  important = false;
  createDate = new Date();
}
