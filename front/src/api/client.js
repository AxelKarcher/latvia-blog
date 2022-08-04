import axios from 'axios'

const apiClient = axios.create({baseURL: 'http://localhost:8080'})

export default apiClient

// import apiClient from './client'

// const deleteArray = (id) => {
//   return (
//     apiClient.delete('/delete/array/' + id)
//   )
// }

// export default {deleteArray}