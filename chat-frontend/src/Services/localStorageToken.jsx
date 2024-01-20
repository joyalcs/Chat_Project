const storeToken = (value) => {
    if (value) {
      const { token } = value
      console.log('token:', token);
      localStorage.setItem('token', token)
    }
  }

const getToken = () => {
    let token = localStorage.getItem('token')
    return { token }
  }

const removeToken = () => {
    localStorage.removeItem('token')
  }

  export { storeToken, getToken, removeToken }
