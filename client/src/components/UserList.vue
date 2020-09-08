<template src="./UserList.html"></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";

@Component({})
export default class UserListComponent extends Vue {
  public usersList = [];

  public async getUsers() {
    try {
      this.$showLoader(true);
      let response = await Axios.get("http://localhost:3000/user/getUsers");
      console.log(response.data);
      this.$showLoader(false);
      this.usersList = response.data.users;
    } catch (error) {
      console.log(error);
      this.$showLoader(false);
    }
  }
  public async deleteUser(userId) {
    try {
      this.$showLoader(true);
      let response = await Axios.delete(
        "http://localhost:3000/user/deleteUser/" + userId
      );
      console.log(response.data);
      this.$showLoader(false);
      this.$snotify.success(response.data.message);
      this.getUsers();
    } catch (error) {
      console.log(error);
      this.$showLoader(false);
    }
  }
  mounted() {
    this.getUsers();
  }
}
</script>
<style src="./UserList.css">
</style>

