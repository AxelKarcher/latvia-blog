import apiClient from '../api/client'

const register = (pseudo, mail, password) => {
  return apiClient.post('/auth/register', {pseudo, mail, password})
}

const login = (pseudo, password) => {
  return apiClient.post('/auth/login', {pseudo, password})
}

export {register, login}
