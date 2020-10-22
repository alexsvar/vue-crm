import firebase from 'firebase/app'

export default {
  actions: {
    async createNote({dispatch, commit}, note) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database()
          .ref(`/users/${uid}/notes`)
          .push(note)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
