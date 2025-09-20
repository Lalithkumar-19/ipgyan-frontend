import axios from "axios";


export const Whatsappsender = () => {
    const message = encodeURIComponent("Hello IPGYAN team, I'd like to book my first visit. Please get in touch.");
    const url = `https://wa.me/917061034958?text=${message}`;
    window.open(url, '_blank');
}

export const api = axios.create({ baseURL: 'http://localhost:3001' ,headers:{
    "Content-Type":"application/json",
    "Authorization":`Bearer ${localStorage.getItem("admin_token")}`
}});
