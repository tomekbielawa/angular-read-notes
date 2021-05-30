export class Note {
  id: string;
  title: string;
  author: string;
  text: string;
  tags: Array<string>;
  important = false;
  createDate = new Date();
}
