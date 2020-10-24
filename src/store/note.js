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
    },
    async fetchNotes({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const notes = (
          await firebase.database()
            .ref(`/users/${uid}/notes`)
            .once('value')
        ).val() || {}
        return Object.keys(notes).map(key => ({...notes[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchNoteById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const note = (
          await firebase.database()
            .ref(`/users/${uid}/notes`)
            .child(id)
            .once('value')
        ).val() || {}
        return {...note, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
