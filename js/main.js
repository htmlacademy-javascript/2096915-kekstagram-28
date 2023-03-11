import {createSimilarDescriptionPhoto} from './data.js';
import {renderPhoto} from './thumbnail.js';

const photos = createSimilarDescriptionPhoto();

renderPhoto(photos);
