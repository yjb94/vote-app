import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as utils from './utils';

admin.initializeApp(functions.config().firebase);

const db = admin.database();

// user

// creates default element for initial user
exports.onCreateUser = functions.auth.user().onCreate((user) => {
  const { uid, email } = user;
  const dbRef = db.ref(`/users/${uid}`);
  const updates = {
    email: email,
    createdAt: utils.getTime()
  }
  dbRef.update(updates)
    .then()
    .catch(error => console.error(error));
});

exports.getUser = functions.https.onCall(async (data, context) => {
  const uid = data.uid.toString();

  try {
    const snap = await db.ref(`users/${uid}`).once('value');
    const user = snap.val();
    if (user) {
      user.id = uid;
      delete user['createdAt'];
      return user;
    }
    else {
      return {
        error:'User not found'
      };
    }
  }
  catch (error) {
    return {
      error
    };
  }
});