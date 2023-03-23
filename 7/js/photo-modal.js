import { renderComment } from './comment-list.js';
import { isEscapeKey } from './util.js';

const photoModalElement = document.querySelector('.big-picture');
const bigPicturePhoto = photoModalElement.querySelector('.big-picture__img');
const bigPictureSocial = photoModalElement.querySelector('.big-picture__social');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const socialCommentList = bigPictureSocial.querySelector('.social__comments');
const commentLoaderButton = bigPictureSocial.querySelector('.comments-loader');

const LOADING_COMMENT = 5;

const clearCommentsList = () => {
  document.querySelector('.social__comments').innerHTML = '';
};

const getPhotoData = (photo) => {
  const { url, description, likes, comments } = photo;
  bigPicturePhoto.querySelector('img').src = url;
  bigPicturePhoto.querySelector('img').alt = description;
  bigPictureSocial.querySelector('.social__caption').textContent = description;
  bigPictureSocial.querySelector('.likes-count').textContent = likes;
  bigPictureSocial.querySelector('.comments-count').textContent = comments.length;
  clearCommentsList();
};

const showSocialCommentCount = (quantity) => {
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsCount = document.querySelectorAll('.social__comment').length;
  socialCommentCount.innerHTML = `${quantity} из <span class="comments-count">${commentsCount}</span> комментариев`;
};

const removeHiddenCommentClass = (element, maxValue) => {
  for (let i = 0; i < maxValue; i++) {
    element[i].classList.remove('hidden');
  }
};

const onCommentsLoaderButton = () => {
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  const commentsCount = document.querySelectorAll('.social__comment').length;
  const hiddenCommentsLength = hiddenComments.length;
  if (hiddenCommentsLength <= LOADING_COMMENT) {
    commentLoaderButton.classList.add('hidden');
  }
  if (hiddenCommentsLength < LOADING_COMMENT) {
    removeHiddenCommentClass(hiddenComments, hiddenCommentsLength);
  } else {
    removeHiddenCommentClass(hiddenComments, LOADING_COMMENT);
  }
  const restHiddenComments = document.querySelectorAll('.social__comment.hidden').length;
  showSocialCommentCount(commentsCount - restHiddenComments);
};

const clearCommentsLoaderButton = () => {
  commentLoaderButton.removeEventListener('click', onCommentsLoaderButton);
  commentLoaderButton.classList.remove('hidden');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
    clearCommentsLoaderButton();
  }
};

function closeBigPicture() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearCommentsList();
}

const showComment = (photo) => {
  photo.comments.forEach((comment, index) => {
    socialCommentList.append(renderComment(comment));
    if (index > LOADING_COMMENT - 1) {
      socialCommentList.querySelectorAll('li')[index].classList.add('hidden');
    }
  });
  if (photo.comments.length <= LOADING_COMMENT) {
    commentLoaderButton.classList.add('hidden');
    showSocialCommentCount(photo.comments.length);
  } else {
    showSocialCommentCount(LOADING_COMMENT);
  }
};

const loadComment = () => commentLoaderButton.addEventListener('click', onCommentsLoaderButton);

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
    clearCommentsLoaderButton();
  });
};

export { openModalBigPicture, closeModalBigPicture };
