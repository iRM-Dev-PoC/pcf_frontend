import { uploadFileType } from "../utils/types";

const fileUpload = async (data: uploadFileType) => {
    const requestData = data;

    try {
        console.log(requestData);
        return true;
    } catch (error) {
        console.error("Error uploading file:", error);
        return false;
    }
};

export default fileUpload;
