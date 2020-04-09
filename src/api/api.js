import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}