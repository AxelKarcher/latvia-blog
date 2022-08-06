import apiClient from '../api/client'

const getInfos = (token) => {
  return apiClient.get('/user/getInfos', {
    headers: {Authorization: 'Bearer ' + token},
  })
}

export {getInfos}
