const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const uploadPhoto = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

    if (matches) {
      imgUploadPreview.src = URL.createObjectURL(file);
    }
  });
};

export { uploadPhoto };
