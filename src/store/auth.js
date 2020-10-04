import firebase from 'firebase/app'

export default {
  actions: {
    async register({dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name
        })
      } catch(e) {
        console.log(e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(e) {
        throw e
      }
    },
    async logout() {
      await firebase.auth().signOut()
    }
  }
}