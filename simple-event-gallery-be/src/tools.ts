// Function to generate a random string of given length
function generateRandomString(length : number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

// Function to rename the file by appending a random string before the file extension
export function generateUniqueFilename(fileName : string) {
    const fileExtensionIndex = fileName.lastIndexOf('.');
    if (fileExtensionIndex !== -1) {
        const baseName = fileName.slice(0, fileExtensionIndex);
        const extension = fileName.slice(fileExtensionIndex);
        return baseName + generateRandomString(4) + extension;
    } else {
        // Handle the case where there is no file extension
        return fileName + generateRandomString(4);
    }
}