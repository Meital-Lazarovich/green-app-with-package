import axios from 'axios';

const BASE_URL = 'https://jupiter.d.greeninvoice.co.il/api/v1/account'
const USER_KEY = 'user'

export const userService = {
    login,
    logout,
    loadUser
}

async function login(credentials) {
    try {
        const { data } = await axios.post(`${BASE_URL}/login`, credentials)
        //saving the current logged in user for surviving page refresh (but not tab closure)
        sessionStorage.setItem(USER_KEY, JSON.stringify(data))
        return data
    } catch (err) {
        console.log('Error from userService:', err);
    }
}

async function logout() {
    try {
        await axios.post(`${BASE_URL}/logout`)
        sessionStorage.setItem(USER_KEY, '')
    } catch (err) {
        console.log('Error from userService:', err);
    }
}

function loadUser() { 
    var user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null
}
