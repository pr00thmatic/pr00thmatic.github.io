import { auth } from './firebase';

// Sign up!
export const register = (email) => {
  const settings = {
    url: 'https://www.newgrounds.com/',
    handleCodeInApp: true,
  };

  auth.sendSignInLinkToEmail(email, settings)
    .then(function () {
      window.localStorage.setItem('emailForSignIn', email);
      console.log("he is signed in!! :O");
    })
    .catch(function (error) {
      console.log(error.code);
    });
};
