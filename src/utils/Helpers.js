const maxImagesUpload = 5;
const maxImageSize = 2 * 1024 * 1024; // 2MB

export function image_validate(files, allSelectedFiles) {
    let error = '';
    if (allSelectedFiles.length > maxImagesUpload) {
        error = 'You can only upload up to 5 files.'
    }
    else if (files.some((file) => file.size > maxImageSize)) {
        error = 'File size exceeds 2MB limit';
    }
    return error;
}