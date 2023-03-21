const isEscapeKey = (evt) => evt.key === 'Escape';

const clearCommentList = () => {
  document.querySelector('.social__comments').innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearCommentList();
}

export { onDocumentKeydown, closeBigPicture, clearCommentList };
