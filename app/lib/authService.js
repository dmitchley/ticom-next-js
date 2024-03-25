// const axios = require("axios");

// class AuthService {
//   constructor(url) {
//     this.instance = axios.create({
//       baseURL: url,
//       timeout: 30000,
//       timeoutErrorMessage: "Time out!",
//     });
//   }

//   login(username, password) {
//     return this.instance
//       .post("/login", {
//         username,
//         password,
//       })
//       .then((res) => ({
//         username: res.data.username,
//         accessToken: res.data.access_token,
//         expiredAt: res.data.expiredAt,
//       }));
//   }
// }

// module.exports = AuthService;
