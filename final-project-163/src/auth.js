var auth = ( () => {
  return {
    login (value) {
      document.cookie = "unsafeLogin=" + value;
    },

    getUserId () {
      var c_start, c_end, c_name;

      c_name = 'unsafeLogin';

      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end === -1) {
            c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    }
  };
})();

export default auth;
