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

export function getDays() {
    let options = [];
    for (let i = 1; i <= 31; i++) {
        options.push({
            label: i,
            value: i,
        });
    }
    return options;
}

export function getYears(startYear) {
    let options = [];
    let thisYear = new Date().getFullYear();
    for (let i = thisYear; i >= (startYear || 1950); i--) {
        options.push({
            label: i,
            value: i,
        });
    }
    return options;
}

export const isValidMobileNumber = (value) => /^\d{10}$/.test(value);

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidDate = (day, month, year) => {
    const maxDaysInMonth = new Date(year, parseInt(month), 0).getDate();
    return day >= 1 && day <= maxDaysInMonth;
}

export const isValidLinkedInUrl = (value) => /^https:\/\/www\.linkedin\.com\/.*$/.test(value);

export const isValidGitHubUrl = (value) => /^https:\/\/github\.com\/.*$/.test(value);

export const isValidUrl = (value) => /^(https?|http):\/\/.*$/.test(value);

export const extensionCommunication = (extensionMessage) => {
    try {
        let jrContainer = document.getElementsByTagName("jobrobo-container");
        const extensionId = jrContainer[0].getAttribute("extention-id").trim();

        if (extensionId) {
            window.chrome.runtime.sendMessage(extensionId, {
                message: extensionMessage,
            });
        }
    } catch (e) {
        console.log("error in extensionCommunication", e);
    }
};

export const postExtensionCommunication = (extensionMessage, userId) => {
    try {
        let jrContainer = document.getElementById("post-scrapper-container");
        const extensionId = jrContainer.getAttribute("extention-id").trim();

        if (extensionId) {
            console.log(extensionId);
            window.chrome.runtime.sendMessage(extensionId, {
                message: extensionMessage,
                userId: userId,
            });
        }
    } catch (e) {
        console.log("error in extensionCommunication", e);
    }
};

export const extensionCommunicationSameJob = (extensionMessage, payload) => {
    try {
        let jrContainer = document.getElementsByTagName("jobrobo-container");
        const extensionId = jrContainer[0].getAttribute("extention-id").trim();

        if (extensionId && payload) {
            window.chrome.runtime.sendMessage(extensionId, {
                message: extensionMessage,
                payload: payload,
            });
        }
    } catch (e) {
        console.log("error in extensionCommunication", e);
    }
};

export const generateUuidForUserEmail = async (email) => {
    // Convert the postUrl to ArrayBuffer
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(email);

    // Generate SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    // Convert the hash buffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const uniqueId = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return uniqueId;
};
