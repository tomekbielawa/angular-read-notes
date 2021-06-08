import { NotesService } from './notes.service';

describe('NotesService', () => {
  const notesService = new NotesService();

  it('should set default notes', () => {
    // given

    // when

    // then
    expect(notesService.notes.length).toBeGreaterThan(0);
    expect(notesService.setDefaultNotes).toHaveBeenCalled();
  });
});
