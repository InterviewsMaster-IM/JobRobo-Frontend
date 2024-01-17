import { format, parseISO } from 'date-fns';

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

export const formatShortMonthYear = (date) => {
    if (date) {
        const parsedDate = parseISO(date);
        return format(parsedDate, "MMM yyyy");
    } else {
        return '-';
    }
};
