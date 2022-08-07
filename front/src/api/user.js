import apiClient from '../api/client'

const getInfos = (token) => {
  return apiClient.get('/user/getInfos', {
    headers: {Authorization: 'Bearer ' + token},
  })
}

const updateInfos = (token, pseudo, mail, password) => {
  return apiClient.post('/user/updateInfos', {pseudo, mail, password}, {
    headers: {Authorization: 'Bearer ' + token}
  })
}

export {getInfos, updateInfos}
