import { isEscapeKey } from './util.js';
import { resetScale } from './scale-picture.js';
import { resetEffects } from './effect-picture.js';
import { sendData } from './api.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_SYMS_COMMENTS = 140;

const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ОПУБЛИКОВЫВАЮ...'
};

const ErrorText = {
  HASHTAG: 'Неправильное заполнение поля',
  COMMENT: `До ${MAX_SYMS_COMMENTS} символов`
};

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadFile = document.querySelector('#upload-file');
const imgUploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const successElement = document.querySelector('#success')
  .content
  .querySelector('.success');
const succesButtonElement = successElement.querySelector('.success__button');
const errorElement = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorButtonElement = errorElement.querySelector('.error__button');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isInFocusField = () => document.activeElement === hashtagField || document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInFocusField()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onCloseUploadOverlayClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

function closeUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadCancel.removeEventListener('click', onCloseUploadOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetEffects();
  imgUploadForm.reset();
  pristine.reset();
}

const openImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', onCloseUploadOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadFile.addEventListener('change', openImgUploadForm);

const isValidHashtag = (hashtag) => HASHTAG_REGEXP.test(hashtag);

const isValidLengthHashtag = (hashtags) => hashtags.length <= MAX_HASHTAG_COUNT;

const isUniqueHashtag = (hashtags) => {
  const uniqHashtag = [];
  for (let i = 0; i < hashtags.length; i++) {
    if (uniqHashtag.includes(hashtags[i])) {
      return false;
    } else {
      uniqHashtag.push(hashtags[i]);
    }
  }
  return true;
};

const validateHashtag = (value) => {
  const hashtags = value
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => hashtag.trim().length);
  return hashtags.every(isValidHashtag) && isValidLengthHashtag(hashtags) && isUniqueHashtag(hashtags);
};

pristine.addValidator(
  hashtagField,
  validateHashtag,
  ErrorText.HASHTAG
);

const validateComment = (value) => value.length <= MAX_SYMS_COMMENTS;

pristine.addValidator(
  commentField,
  validateComment,
  ErrorText.COMMENT
);

const blockSubmitButton = (blockSubmit = false, buttonText = SubmitButtonText.IDLE) => {
  submitButton.disabled = blockSubmit;
  submitButton.textContent = buttonText;
};

const showModalMessage = (element) => document.body.append(element);

const removeModalMessage = () => {
  successElement.remove();
  errorElement.remove();
};

const onCloseModalMessageClick = () => {
  removeModalMessage();
  document.addEventListener('keydown', onDocumentKeydown);
  clearEventListener();
};

const onModalMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeModalMessage();
    document.addEventListener('keydown', onDocumentKeydown);
    clearEventListener();
  }
};

const onBodyCloseModalMessageClick = (evt) => {
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    removeModalMessage();
    document.addEventListener('keydown', onDocumentKeydown);
    clearEventListener();
  }
};

const closeModalMessage = (element) => {
  element.addEventListener('click', onCloseModalMessageClick);
  document.addEventListener('keydown', onModalMessageKeydown);
  document.addEventListener('click', onBodyCloseModalMessageClick);
};

function clearEventListener () {
  document.removeEventListener('keydown', onModalMessageKeydown);
  document.removeEventListener('click', onBodyCloseModalMessageClick);
  document.removeEventListener('keydown', onBodyCloseModalMessageClick);
}

const showSuccesModalMessage = () => {
  showModalMessage(successElement);
  closeModalMessage(succesButtonElement);
};

const showErrorModalMessage = () => {
  showModalMessage(errorElement);
  closeModalMessage(errorButtonElement);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const setUserFormSubmit = (onSucces) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton(true, SubmitButtonText.SENDING);
      sendData(new FormData(evt.target))
        .then(onSucces)
        .then(showSuccesModalMessage)
        .catch(showErrorModalMessage)
        .finally(blockSubmitButton);
    }
  });
};

const resetForm = () => setUserFormSubmit(closeUploadOverlay);

export { resetForm };
