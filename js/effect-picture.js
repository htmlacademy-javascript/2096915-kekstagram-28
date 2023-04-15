const EffectsList = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos : {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const EFFECT_DEFAULT = EffectsList.none;

const shownImage = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');

let chosenEffect = EFFECT_DEFAULT;

noUiSlider.create(slider, {
  range: {
    min: EFFECT_DEFAULT.min,
    max: EFFECT_DEFAULT.max,
  },
  start: EFFECT_DEFAULT.max,
  step: EFFECT_DEFAULT.step,
  connect: 'lower'
});

const isDefault = () => chosenEffect === EFFECT_DEFAULT;

const showSliderContainer = () => sliderContainer.classList.remove('hidden');

const hideSliderContainer = () => sliderContainer.classList.add('hidden');

hideSliderContainer();

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step
  });

  if (isDefault()) {
    hideSliderContainer();
  } else {
    showSliderContainer();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return false;
  }
  const selectedFilter = evt.target.value;
  chosenEffect = EffectsList[`${selectedFilter}`];
  shownImage.className = `effects__preview--${selectedFilter}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  shownImage.style.filter = (isDefault()) ? EFFECT_DEFAULT.filter : `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
};

const resetEffects = () => {
  chosenEffect = EFFECT_DEFAULT;
  updateSlider();
};

effectsList.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
