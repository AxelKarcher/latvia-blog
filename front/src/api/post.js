import apiClient from './client'

const create = (title, location, file, description) => {
  const formData = new FormData()

  formData.append('image', file)
  formData.append('string', title)
  formData.append('string', location)
  formData.append('string', description)

  return apiClient.post('/post/create', formData, {
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

const getAll = () => {
  return apiClient.get('/post/getAll')
}

const remove = (key) => {
  return apiClient.post('/post/remove', {key})
}

export {create, getAll, remove}
