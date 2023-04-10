const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_DEFAULT = 100;

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview img');

const showImgScale = (value) => {
  scaleValueField.value = `${value}%`;
  imgUpload.style.transform = `scale(${value / 100})`;
};

const onClickButtonScaleSmaller = () => {
  const scaleValue = parseInt(scaleValueField.value, 10);
  const currentScale = scaleValue - SCALE_STEP;
  if (currentScale < MIN_SCALE) {
    return false;
  }
  showImgScale(currentScale);
};

const onClickButtonScaleBigger = () => {
  const scaleValue = parseInt(scaleValueField.value, 10);
  const currentScale = scaleValue + SCALE_STEP;
  if (currentScale > MAX_SCALE) {
    return false;
  }
  showImgScale(currentScale);
};

const resetScale = () => showImgScale(SCALE_DEFAULT);

buttonScaleSmaller.addEventListener('click', onClickButtonScaleSmaller);
buttonScaleBigger.addEventListener('click', onClickButtonScaleBigger);

export { resetScale };
