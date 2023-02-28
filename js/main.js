const SIMILAR_PHOTO_COUNT = 25;
const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const AVATAR_COUNT = 6;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 500;
const COMMENT_COUNT = 3;

const PHOTOS_DESCRIPTIONS = [
  'Здесь я лежу и кайфую на пляже',
  'Иду в магазин за пивком',
  'Красивый закат сегодня',
  'Сфоткал, "типа моя машина"',
  'Отдыхаем с друзьями :)',
  'Это я приготовил. Сколько звёзд дадите?',
  'Что-то скучно, кто-то гулять пойдёт?',
  'Всем сладких снов, я на боковую',
  'Эт я сфоткался у Эйфелевой башни',
  'А как у вас дела, друзья?'
];

const COMMENTATORS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATORS_NAMES = ['Артём', 'Роман', 'Виталий', 'Анастасия', 'Владислав', 'Виктор', 'Кристина', 'Мария', 'Дмитрий', 'Кирилл'];

const createIdGenerator = (start) => () => start++;

const generatePhotoId = createIdGenerator(1);
const generatePhotoUrl = createIdGenerator(1);

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENTATORS_MESSAGES)).join(' ');

const createCommentByPhoto = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(COMMENTATORS_NAMES)
});

const createDescriptionPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(PHOTOS_DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createCommentByPhoto)
});

const createSimilarDescriptionPhoto = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createDescriptionPhoto);

createSimilarDescriptionPhoto();
