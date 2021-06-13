import { Note } from '../class/note';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let notesService;

  beforeEach(() => {
    notesService = new NotesService();
  });

  it('should set default notes', () => {
    // given
    // when
    // then
    expect(notesService.notes.length).toBeGreaterThan(0);
  });

  it('should get note by id', () => {
    // given
    const sampleNoteId = '1';

    // when
    const result = notesService.getNote(sampleNoteId);

    // then
    expect(result.id).toBe(sampleNoteId);
    expect(result.author).toBe('Jan Kowalski');
  });

  it('should get first note when pagination occurs', () => {
    // given
    // when
    notesService.previousNote();
    const result = notesService.currentNote;

    // then
    expect(result.id).toBe('1');
  });

  it('should set current note when pagination occurs', () => {
    // given
    const sampleNoteId = '3';

    // when
    const result = (notesService.currentNote = notesService.notes[2]);

    // then
    expect(result.id).toBe(sampleNoteId);
    expect(result.author).toBe('Monokles');
  });

  it('should set previous note when pagination occurs', () => {
    // given
    // when
    notesService.previousNote();
    const result = notesService.currentNote;

    // then
    expect(result.id).toBe('1');
  });

  it('should get no previous note when pagination occurs', () => {
    // given
    // when
    notesService.previousNote();
    const result = notesService.getPreviousNote();

    // then
    expect(result).toBe(null);
  });

  it('should get previous note when pagination occurs', () => {
    // given
    // when
    notesService.nextNote();
    const result = notesService.getPreviousNote();

    // then
    expect(result.id).toBe('1');
  });

  it('should set next note when pagination occurs', () => {
    // given
    // when
    notesService.nextNote();
    const result = notesService.currentNote;

    // then
    expect(result.id).toBe('2');
  });

  it('should get next note when pagination occurs', () => {
    // given
    // when
    notesService.nextNote();
    const result = notesService.getNextNote();

    // then
    expect(result.id).toBe('3');
  });

  it('should add new note', () => {
    // given
    const sampleNote = new Note();
    sampleNote.id = '1234';

    // when
    notesService.addNote(sampleNote);
    const result = [...notesService.notes].pop();

    // then
    expect(result.id).toBe('1234');
  });

  it('should create new note', async () => {
    // given
    const sampleNote = new Note();
    sampleNote.id = '2345';

    // when
    notesService.createNewNote(sampleNote).then(result => {
      // then
      expect(result.id).toBe('2345');
    });
  });

  it('should get paginated notes with default pagination values', () => {
    // given

    // when
    notesService.notes = notesService.getNotesPaginated();

    // then
    expect(notesService.notes.length).toBe(2);
    expect(notesService.notes[0].author).toBe('Jan Kowalski');
    expect(notesService.notes[1].author).toBe('Piotr Nowak');
  });

  it('should get paginated notes on the second page', () => {
    // given
    const sampleIndex = 1;

    // when
    notesService.notes = notesService.getNotesPaginated(sampleIndex);

    // then
    expect(notesService.notes.length).toBe(2);
    expect(notesService.notes[0].author).toBe('Monokles');
    expect(notesService.notes[1].author).toBe('Orletta Mirango');
  });

  it('should get paginated notes on the third page', () => {
    // given
    const sampleIndex = 2;

    // when
    notesService.notes = notesService.getNotesPaginated(sampleIndex);

    // then
    expect(notesService.notes.length).toBe(1);
    expect(notesService.notes[0].author).toBe('Lidia van Kohl');
  });

  it('should get paginated notes on the first page with 4 items per page', () => {
    // given
    const sampleIndex = 0,
      pagesLength = 4;

    // when
    notesService.notes = notesService.getNotesPaginated(
      sampleIndex,
      pagesLength
    );

    // then
    expect(notesService.notes.length).toBe(4);
    expect(notesService.notes[0].author).toBe('Jan Kowalski');
  });

  it('should get paginated notes on the second page with 4 items per page', () => {
    // given
    const sampleIndex = 1,
      pagesLength = 4;

    // when
    notesService.notes = notesService.getNotesPaginated(
      sampleIndex,
      pagesLength
    );

    // then
    expect(notesService.notes.length).toBe(1);
    expect(notesService.notes[0].author).toBe('Lidia van Kohl');
  });

  it('should get no paginated notes', () => {
    // given
    const sampleIndex = 20;

    // when
    notesService.notes = notesService.getNotesPaginated(sampleIndex);

    // then
    expect(notesService.notes.length).toBe(0);
  });

  it('should set no notes', () => {
    // given
    const sampleNotes = [];

    // when
    notesService.notes = sampleNotes;

    // then
    expect(notesService.notes.length).toBe(0);
  });
});
