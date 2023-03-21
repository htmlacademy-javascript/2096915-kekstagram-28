import { renderComment } from './comment-list.js';
import { onDocumentKeydown, closeBigPicture, clearCommentList, showSocialCommentCount, clearCommentsLoaderButton, onCommentsLoaderButton } from './utils/modal-util.js';

const photoModalElement = document.querySelector('.big-picture');
const bigPicturePhoto = photoModalElement.querySelector('.big-picture__img');
const bigPictureSocial = photoModalElement.querySelector('.big-picture__social');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const socialCommentList = bigPictureSocial.querySelector('.social__comments');
const commentsLoaderButton = bigPictureSocial.querySelector('.comments-loader');

const getPhotoData = (photo) => {
  const { url, description, likes, comments } = photo;
  bigPicturePhoto.querySelector('img').src = url;
  bigPicturePhoto.querySelector('img').alt = description;
  bigPictureSocial.querySelector('.social__caption').textContent = description;
  bigPictureSocial.querySelector('.likes-count').textContent = likes;
  bigPictureSocial.querySelector('.comments-count').textContent = comments.length;
  clearCommentList();
};

const showComment = (photo) => {
  photo.comments.forEach((comment, index) => {
    socialCommentList.append(renderComment(comment));
    if (index > 4) {
      socialCommentList.querySelectorAll('li')[index].classList.add('hidden');
    }
  });
  if (photo.comments.length < 6) {
    commentsLoaderButton.classList.add('hidden');
    showSocialCommentCount(photo.comments.length);
  }
};

const loadComment = () => commentsLoaderButton.addEventListener('click', (onCommentsLoaderButton));

const openModalBigPicture = (thumbnail, photo) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    photoModalElement.classList.remove('hidden');
    getPhotoData(photo);
    document.body.classList.add('modal-open');
    showComment(photo);
    loadComment();
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const closeModalBigPicture = () => {
  photoModalCloseElement.addEventListener('click', () => {
    closeBigPicture();
    clearCommentsLoaderButton(commentsLoaderButton);
  });
};

export { openModalBigPicture, closeModalBigPicture };
