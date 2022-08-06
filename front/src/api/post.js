import apiClient from './client'

const create = (file) => {
  const formData = new FormData()

  formData.append('image', file)

  return apiClient.post('/post/create', formData, {
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export {create}
