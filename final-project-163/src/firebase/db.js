import firebase from 'firebase';
import auth from '../auth';

const db = {
  dbRef: firebase.database(),

  setNextProfessorID () {
    this.getNextProfessorID().then((snapshot) => {
      this.dbRef.ref('/2018/nextProfessorID').set(snapshot.val() + 1);
    });
  },

  getNextProfessorID () {
    return this.dbRef.ref('/2018/nextProfessorID').once('value');
  },

  professors (id) {
    if (typeof(id) !== 'undefined') {
      return this.dbRef.ref('/2018/professors/' + id).once('value');
    } else {
      return this.dbRef.ref('/2018/professors').once('value');
    }
  },

  assignatures () {
    return this.dbRef.ref('/assignatures/').once('value');
  },

  setAssignature (professorID, assignature, assignatureName) {
    return this.dbRef.ref('/2018/professors/' + professorID +
                          '/assignatures/' + assignatureName)
      .set(assignature);
  },

  setProfessor (professorID, model) {
    return this.dbRef.ref('/2018/professors/' + professorID)
      .set(model);
  },

  createProfessor (model) {
    var id;

    this.getNextProfessorID().then((snapshot) => {
      id = snapshot.val();

      this.dbRef.ref('/2018/login/professors/' + id).set(model.name);
      this.dbRef.ref('/2018/professors/' + id).set(model);
      this.setNextProfessorID();
    });
  },

  removeProfessor (id) {
    this.dbRef.ref('/2018/professors/' + id).remove();
    this.dbRef.ref('/2018/login/professors/' + id).remove();
  },

  login (name) {
    return this.dbRef.ref('2018/login/professors').once('value')
      .then((snapshot) => {
        var val = snapshot.val();
        var loggedIn = false;
        var id;

        Object.keys(val).forEach((key) => {
          if (val[key] === name) {
            id = key;
            loggedIn = true;
          }
        });

        if (!loggedIn) {
          id = name;
        }

        auth.login(id);
        console.log('BIENVENIDO PROFE ' + auth.getUserId());
      });
  }
};

export default db;
