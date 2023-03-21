const isEscapeKey = (evt) => evt.key === 'Escape';

const clearCommentList = () => {
  document.querySelector('.social__comments').innerHTML = '';
};

const showSocialCommentCount = (quantity) => {
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsCount = document.querySelectorAll('.social__comment').length;
  socialCommentCount.innerHTML = `${quantity} из <span class="comments-count">${commentsCount}</span> комментариев`;
};

const onCommentsLoaderButton = () => {
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  const commentList = document.querySelectorAll('.social__comment').length;
  const hiddenCommentsLength = hiddenComments.length;
  if (hiddenCommentsLength < 6) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
  if (hiddenCommentsLength < 5) {
    for (let i = 0; i < hiddenCommentsLength; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
  } else {
    for (let i = 0; i < 5; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
  }
  const restHiddenComments = document.querySelectorAll('.social__comment.hidden').length;
  showSocialCommentCount(commentList - restHiddenComments);
};

const clearCommentsLoaderButton = () => {
  document.querySelector('.comments-loader').removeEventListener('click', (onCommentsLoaderButton));
  document.querySelector('.comments-loader').classList.remove('hidden');
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
  clearCommentList();
  showSocialCommentCount(5);
}

export { onDocumentKeydown, closeBigPicture, clearCommentList, showSocialCommentCount, clearCommentsLoaderButton, onCommentsLoaderButton };
