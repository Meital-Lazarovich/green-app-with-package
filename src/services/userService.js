import axios from 'axios';
import { mock } from './mock';

const BASE_URL = 'https://jupiter.d.greeninvoice.co.il/api/v1'
const USER_KEY = 'user'

export const userService = {
    login,
    logout,
    loadUser,
    getChartData
}

async function login(credentials) {
    try {
        const { data } = await axios.post(`${BASE_URL}/account/login`, credentials)
        //saving the current logged in user for surviving page refresh (but not tab closure)
        sessionStorage.setItem(USER_KEY, JSON.stringify(data))
        return data
    } catch (err) {
        console.log('Error from userService:', err);
        sessionStorage.setItem(USER_KEY, JSON.stringify(mock.userMock))
        return mock.userMock
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

async function getChartData(startDate, endDate) {
    try {
        const {data} = await axios.get(`${BASE_URL}/reports/insights/past?exemption=false&from=${startDate}&to=${endDate}&vat=true&size=8`)
        console.log('getChartData -> data', data);
        return data.charts
    } catch (err) {
        console.log('Error from userService:', err);
        return mock.chartData
    }
}

