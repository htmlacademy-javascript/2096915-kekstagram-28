import { renderPhoto } from './thumbnail.js';
import { resetForm } from './form.js';
import { showAlert } from './util.js';
import { getData } from './api.js';

getData()
  .then((thumbnail) => renderPhoto(thumbnail))
  .catch((err) => showAlert(err.message));

resetForm();
