import { FormGroup, ValidatorFn } from '@angular/forms';

const inappropriateAuthors = ['Józef Stalin', 'Adolf Hitler'];

export function censorshipValidator(form: FormGroup): ValidatorFn {
  const authorControl = form.get('author'),
    author = authorControl && authorControl.value;

  // @TODO regexp
  if (author) {
    const inappropriateAuthor = inappropriateAuthors.find(
      _author => _author === author
    );

    if (inappropriateAuthor) {
      authorControl.setErrors({ censorship: true });
    }
  }

  return null;
}
