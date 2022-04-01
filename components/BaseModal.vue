<template>
  <div class="wrapper">
    <div class="block" @click.stop>
      <van-cell-group
        :title="`More Info about (${moreContent.package.name} v${moreContent.package.version})`"
      >
        <van-cell
          v-if="moreContent.package.author && moreContent.package.author.name"
          title="Author"
          :label="moreContent.package.author.name"
        />
        <van-cell
          title="Bugs"
          is-link
          center
          label="go to Github Issues"
          :url="moreContent.package.links.bugs"
        />
        <van-cell
          title="Homepage"
          is-link
          center
          label="go to Homepage"
          :url="moreContent.package.links.homepage"
        />
        <van-cell
          title="Npm"
          is-link
          center
          label="go to Npm Page"
          :url="moreContent.package.links.npm"
        />
        <van-cell
          title="Repository"
          is-link
          center
          label="go to Official repository page"
          :url="moreContent.package.links.repository"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Cell, CellGroup } from 'vant'
import INpmObject from '~/types/INpmObject'

export default Vue.extend({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  props: {
    moreContent: {
      type: Object,
      required: true,
    } as PropOptions<INpmObject>,
  },
})
</script>
