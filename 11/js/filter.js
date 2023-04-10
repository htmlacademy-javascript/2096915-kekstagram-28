const PICTURES_RANDOM_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filter.DEFAULT;
let pictures = [];

const filterElement = document.querySelector('.img-filters');
const filterElementButton = filterElement.querySelectorAll('.img-filters__button');

const sortRandom = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return pictures.slice().sort(sortRandom).slice(0, PICTURES_RANDOM_COUNT);
    case Filter.DISCUSSED:
      return pictures.slice().sort(sortByComments);
    default:
      return pictures.slice();
  }
};

const addFilterClickHandler = (button, cb) => {
  filterElementButton[button].addEventListener('click', (evt) => {
    const clickedButton = evt.target;

    if (clickedButton.id === currentFilter) {
      return false;
    }

    filterElementButton.forEach((element) => element.classList.remove('img-filters__button--active'));
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    cb(getFilteredPictures());
  });
};

const switchFilter = (cb) => {
  for (let i = 0; i < filterElementButton.length; i++) {
    addFilterClickHandler(i, cb);
  }
};

const sortPhotos = (loadedPictures, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = loadedPictures.slice();
  switchFilter(cb);
};

export { sortPhotos };
