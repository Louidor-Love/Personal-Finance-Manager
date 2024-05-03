import { User } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const get_solo_user = async (id: number) => {
    const response = await authAxios.get(`/users/get/solo/${id}/`) 
    return response.data
};

export const edit_user = async (data: User) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("email", data.email)
  
    await authAxios.put(`/users/edit/${data.email}/`, formData)
};

export const search_users = async (query: string) => {
   const response = await authAxios.get(`/users/search/?query=${query}`) 
   return response.data
};

export const delete_user = async (id: number) => {
    await authAxios.delete(`/users/delete/${id}/`) 
};

export const get_users = async () => {
   const response = await authAxios.get("/users/get/") 
   return response.data
};

export const registerRequest = async (email: string, password: string,name: string) => {
    await axi.post("/create/", {email, password, name})
};

export const loginRequest = async (email: string, password: string) => {
        const response = await axi.post("/token/", { email, password });
        return response;
  
};
