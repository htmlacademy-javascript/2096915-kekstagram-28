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

const COMMENTATORS_NAMES = [
  'Артём',
  'Роман',
  'Виталий',
  'Анастасия',
  'Владислав',
  'Виктор',
  'Кристина',
  'Мария',
  'Дмитрий',
  'Кирилл'
];

const SIMILAR_PHOTO_COUNT = 25;

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

const generateCommentId = createRandomIdFromRangeGenerator(1, 300);

const createCommentByPhoto = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTATORS_MESSAGES),
  name: getRandomArrayElement(COMMENTATORS_NAMES)
});

const createDescriptionPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(PHOTOS_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 3)}, createCommentByPhoto)
});

const createSimilarDescriptionPhoto = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createDescriptionPhoto);

createSimilarDescriptionPhoto();
