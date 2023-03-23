import { openModalBigPicture, closeModalBigPicture } from './photo-modal.js';

const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  photo.forEach((element) => {
    const { url, likes, comments, description } = element;
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoListFragment.append(photoElement);
    openModalBigPicture(photoElement, element);
    closeModalBigPicture();
  });
  photoListElement.append(photoListFragment);
};

export { renderPhoto };
