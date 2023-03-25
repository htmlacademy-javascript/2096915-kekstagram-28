import { isEscapeKey } from './util.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadFile = document.querySelector('#upload-file');
const imgUploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function closeUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.reset();
}

const openImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadFile.addEventListener('change', openImgUploadForm);

imgUploadCancel.addEventListener('click', () => {
  closeUploadOverlay();
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  // errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  // errorTextTag: 'span',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// const validateLengthHashtag = (value) => value.length <= 20;

// const validateWritingHashtag = (value) => {
//   const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
//   return value.test(regexp);
// };

// const validateHashtag = (value) => validateLengthHashtag(value) && validateWritingHashtag(value);

// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// нельзя указать больше пяти хэш-тегов;
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// pristine.addValidator(
//   imgUploadForm.querySelector('.text__hashtags'),
//   validateHashtag,
//   'Что-то не то'
// );

const validateComment = (value) => value.length <= 140;

// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateComment,
  'До 140 символов'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);


// Сброс значений
// const resetValue = () => {
//   document.querySelector('input[type=file]').value = '';
//   // document.querySelector('.text__hashtags').value = '';
//   // document.querySelector('.text__description').value = '';
//   // document.querySelector('.effects__preview').value = '';
//   // document.querySelector('.effect-level__value').value = '';
// };
