import { openBigPicture } from './photo-modal.js';

const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

const createPhoto = (photo) => {
  const { url, likes, comments, description } = photo;
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoListFragment.append(photoElement);
  openBigPicture(photoElement, photo);
};

const renderPhoto = (photo) => {
  photoListElement.querySelectorAll('.picture').forEach((element) => element.remove());
  photo.forEach((element) => createPhoto(element));
  photoListElement.append(photoListFragment);
};

export { renderPhoto };
