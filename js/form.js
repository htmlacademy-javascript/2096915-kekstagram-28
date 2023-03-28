import { isEscapeKey } from './util.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadFile = document.querySelector('#upload-file');
const imgUploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');

const isInFocusField = () => document.activeElement === hashtagField || document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInFocusField()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onClickcloseUploadOverlay = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

function closeUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.removeEventListener('click', onClickcloseUploadOverlay);
  imgUploadForm.reset();
}

const openImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.addEventListener('click', onClickcloseUploadOverlay);
};

imgUploadFile.addEventListener('change', openImgUploadForm);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isValidHashtag = (hashtag) => HASHTAG_REGEXP.test(hashtag);

const isValidLengthHashtag = (hashtags) => hashtags.length <= MAX_HASHTAG_COUNT;

const isUniqueHashtag = (hashtags) => {
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqHashtag = [];
  for (let i = 0; i < lowerCaseHashtags.length; i++) {
    if (uniqHashtag.includes(lowerCaseHashtags[i])) {
      return false;
    } else {
      uniqHashtag.push(lowerCaseHashtags[i]);
    }
  }
  return true;
};

const validateHashtag = (value) => {
  const hashtags = value
    .split(' ')
    .filter((hashtag) => hashtag.trim().length);
  return hashtags.every(isValidHashtag) && isValidLengthHashtag(hashtags) && isUniqueHashtag(hashtags);
};

pristine.addValidator(
  hashtagField,
  validateHashtag,
  'Неправильное заполнение поля'
);

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  commentField,
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
