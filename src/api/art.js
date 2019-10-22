import axios from '@/libs/api.request'

export const artAdd = formData => {
  return axios.request({
    url: 'artadd',
    data: formData
  })
}
