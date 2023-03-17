import { renderComment } from './comment-list.js';
import { isEscapeKey } from './util.js';

const photoModalElement = document.querySelector('.big-picture');
const bigPicturePhoto = photoModalElement.querySelector('.big-picture__img');
const bigPictureSocial = photoModalElement.querySelector('.big-picture__social');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');

const getPhotoData = (photo) => {
  const { url, description, likes, comments } = photo;
  bigPicturePhoto.querySelector('img').src = url;
  bigPicturePhoto.querySelector('img').alt = description;
  bigPictureSocial.querySelector('.social__caption').textContent = description;
  bigPictureSocial.querySelector('.likes-count').textContent = likes;
  bigPictureSocial.querySelector('.comments-count').textContent = comments.length;
  bigPictureSocial.querySelector('.social__comments').innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  photoModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openModalBigPicture = (thumbnail, photo) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    photoModalElement.classList.remove('hidden');
    getPhotoData(photo);
    bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureSocial.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');
    photo.comments.forEach((comment) => bigPictureSocial.querySelector('.social__comments').append(renderComment(comment)));
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const closeModalBigPicture = () => {
  photoModalCloseElement.addEventListener('click', () => closeBigPicture());
};

export { openModalBigPicture, closeModalBigPicture };
