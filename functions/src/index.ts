import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as utils from './utils';

const db = admin.database();

// creates default element for initial user
exports.onCreateUser = functions.auth.user().onCreate((user) => {
  const { uid, email } = user;
  const dbRef = db.ref(`/users/${uid}`);
  const updates = {
      email:email,
      createdAt: utils.getTime()
  }
  dbRef.update(updates)
      .then()
      .catch(error => console.error(error));
});