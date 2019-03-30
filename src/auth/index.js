import jwtDecode from 'jwt-decode';

const Auth = {
  isAuthenticated() {
    const token = localStorage.token;
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (!decoded || !decoded.userId || !decoded.userRole || !decoded.iat || !decoded.exp) return false;
    return decoded.exp > Date.now() / 1000 ? true : false
  },
  signout(cb) {
    localStorage.clear();
    cb();
  }
};

export default Auth;