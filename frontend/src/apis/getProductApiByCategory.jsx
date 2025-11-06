import { axiosInstance } from "../config/AxiosInstance";


export const getProductApiByCategory = async(category)=>{
    try {
        console.log("me call hua...");
        const response = await axiosInstance.get(`/product/${category}`);
        console.log(response);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log("error->",error);
    }
}
