<template>
  <div>
    <router-view></router-view>
    <!-- snotify -->
    <vue-snotify></vue-snotify>
    <!-- Page Loader -->
    <page-loader :show="showLoader" label="Please wait..."></page-loader>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PageLoader from "vue-full-loading";
import { LOADER_EVENT } from "@/services/common";

@Component({
  components: { PageLoader },
})
export default class AppComponent extends Vue {
  public showLoader = false;
  mounted() {
    LOADER_EVENT.$on("showLoader", (value) => {
      this.showLoader = value;
    });
  }
}
</script>

