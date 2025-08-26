export const getUserRole = () => {
    return localStorage.getItem('userRole') || 'user'
  }
export const getUserName =() => {
    return localStorage.getItem('userName') || 'Name'
  }
export const getUserEmail =() => {
    return localStorage.getItem('userEmail') || 'Name'
  }