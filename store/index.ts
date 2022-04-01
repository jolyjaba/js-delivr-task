import { GetterTree, ActionTree, MutationTree } from 'vuex'
import INpmResponse from '~/types/INpmResponse'

export const state = () => ({
  packages: {} as INpmResponse,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getPackages: (state) => state.packages,
}

export const mutations: MutationTree<RootState> = {
  SET_PACKAGES: (state, payload: INpmResponse) => (state.packages = payload),
}

export const actions: ActionTree<RootState, RootState> = {
  async searchPackages({ commit }, { text, size = 10, from }) {
    const data = await this.$axios.$get<INpmResponse>('/search', {
      params: { text, size, from },
    })
    commit('SET_PACKAGES', data)
  },
}
