import axios from "axios"

const instance = axios.create({baseURL:'https://test-task.shtrafovnet.com/'})

export const API = {
    getFine(number:string){
        return  instance.get(`fines/${number}`)
    },

}
