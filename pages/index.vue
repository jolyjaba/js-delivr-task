<template>
  <van-row class="full-height" gutter="20">
    <van-search
      v-model="text"
      placeholder="Enter package name"
      @search="onSearch"
      @input="onInput"
    />
    <van-cell-group inset title="Search result">
      <van-empty
        v-if="!(getPackages.objects && getPackages.objects.length) && !loading"
        image="search"
        description="Empty"
      />
      <van-skeleton v-else :loading="loading" title :row="size">
        <van-cell
          v-for="item in getPackages.objects"
          :key="item.package.date"
          :label="item.package.description"
          center
          @click="showMoreInfo(item)"
        >
          <template #title>
            <span>{{ item.package.name }}</span>
            <van-tag plain type="primary">{{ item.package.version }}</van-tag>
          </template>
          <template #extra>
            <van-button size="mini" type="primary" text="More Info" />
          </template>
        </van-cell>
        <van-pagination
          v-model="currentPage"
          class="my-20"
          :total-items="getPackages.total"
          :show-page-size="5"
          prev-text="Prev"
          next-text="Next"
          :items-per-page="size"
          force-ellipses
          @change="onChangePage"
        />
      </van-skeleton>
    </van-cell-group>
    <van-overlay :show="showMore" @click="closeModal">
      <BaseModal :more-content="moreContent" />
    </van-overlay>
  </van-row>
</template>

<script lang="ts">
import {
  Search,
  CellGroup,
  Cell,
  Tag,
  Skeleton,
  Pagination,
  Empty,
  Row,
  Col,
  Divider,
  Button,
  Overlay,
} from 'vant'
import Vue from 'vue'
import { debounce } from 'vue-debounce'
import INpmObject from '~/types/INpmObject'
import type INpmResponse from '~/types/INpmResponse'
import IPaginationPayload from '~/types/IPaginationPayload'
import BaseModal from '~/components/BaseModal.vue'

const initMoreContent: INpmObject = {
  package: {
    author: {
      name: '',
    },
    name: '',
    version: '',
    description: '',
    keywords: [],
    date: '',
    links: {
      npm: '',
      homepage: '',
      repository: '',
      bugs: '',
    },
    publisher: { username: '', email: '' },
    maintainers: [],
  },
  score: {
    final: 0,
    detail: {
      quality: 0,
      popularity: 0,
      maintenance: 0,
    },
  },
  searchScore: 0,
}

export default Vue.extend({
  name: 'IndexPage',
  components: {
    [Overlay.name]: Overlay,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Search.name]: Search,
    [CellGroup.name]: CellGroup,
    [Pagination.name]: Pagination,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [Skeleton.name]: Skeleton,
    [Empty.name]: Empty,
    [Divider.name]: Divider,
    BaseModal,
  },
  data() {
    return {
      text: '',
      loading: false,
      from: 0,
      size: 10,
      currentPage: 1,
      showMore: false,
      moreContent: initMoreContent,
    }
  },
  computed: {
    getPackages(): INpmResponse {
      return this.$store.getters.getPackages
    },
  },
  methods: {
    showMoreInfo(item: INpmObject) {
      this.showMore = true
      this.moreContent = item
    },
    closeModal() {
      this.moreContent = initMoreContent
      this.showMore = false
    },
    async searchPackages(payload: IPaginationPayload) {
      await this.$store.dispatch('searchPackages', payload)
    },
    async onSearch(text: string) {
      const { size, from } = this
      this.loading = true
      await this.searchPackages({ text, size, from })
      this.loading = false
    },
    onInput(text: string) {
      debounce(async (val: string) => await this.onSearch(val), 300)(text)
    },
    async onChangePage(page: number) {
      this.from = (page - 1) * this.size
      await this.onSearch(this.text)
    },
  },
})
</script>

<style lang="scss" scoped>
.full-height {
  height: 100vh;
}
.my-20 {
  margin: 16px 0;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 100%;
  max-width: 75%;
  background-color: #fff;
}
</style>
