import { renderPhoto } from './thumbnail.js';
import { resetForm } from './form.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import { uploadPictures } from './filter.js';

const RERENDER_DELAY = 500;

getData()
  .then((thumbnail) => {
    const debounceRenderPhoto = debounce(renderPhoto, RERENDER_DELAY);
    renderPhoto(thumbnail);
    uploadPictures(thumbnail, debounceRenderPhoto);
  })
  .catch((err) => showAlert(err.message));

resetForm();
