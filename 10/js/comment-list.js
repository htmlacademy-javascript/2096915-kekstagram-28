const renderAvatarComment = (data) => {
  const avatarComment = document.createElement('img');
  avatarComment.classList.add('social__picture');
  avatarComment.src = data.avatar;
  avatarComment.alt = data.name;
  avatarComment.width = 35;
  avatarComment.height = 35;
  return avatarComment;
};

const renderTextComment = (data) => {
  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = data.message;
  return textComment;
};

const renderComment = (data) => {
  const commentListFragment = document.createDocumentFragment();
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  newComment.appendChild(renderAvatarComment(data));
  newComment.appendChild(renderTextComment(data));
  commentListFragment.appendChild(newComment);
  return commentListFragment;
};

export { renderComment };
