// Function to rename the file by appending a random string before the file extension
export function generateUniqueFilename(fileName : string) {
    const fileExtensionIndex = fileName.lastIndexOf('.');
    if (fileExtensionIndex !== -1) {
        const baseName = fileName.slice(0, fileExtensionIndex);
        const extension = fileName.slice(fileExtensionIndex);
        return baseName + Date.now().toString() + extension;
    } else {
        // Handle the case where there is no file extension
        return fileName + Date.now().toString();
    }
}