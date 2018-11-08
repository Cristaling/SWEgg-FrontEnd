export class ImageValidator {
    private static maxFileSize: number = 1024 * 1024;

    public static validateImageFile(file: File): boolean {
        if (file.type.match('image.*')) {
            if(file.size > this.maxFileSize){
                alert('File size exceeded 1MB. Please upload a smaller one !');
                return false;
            }
            return true;
        } else {
            alert('Incorrect file ! Please upload an image.');
            return false;
        }
    }
}
