<template src="./UpdateUser.html"></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";
import { User } from "@/models/user";
import DatePicker from "vuejs-datepicker";
@Component({ components: { DatePicker } })
export default class UpdateUserComponent extends Vue {
  public user = new User();
  public imageSrc = null;
  public imageFile = null;
  public emailExist = null;

  fileChangeEvent(event) {
    this.imageSrc = URL.createObjectURL(event.target.files[0]);
    this.imageFile = event.target.files[0];
  }

  async validateAndSave() {
    try {
      let valid = await this.$validator.validateAll();
      if (valid) {
        let formData = new FormData();
        this.$showLoader(true);
        formData.append("file", this.imageFile);
        formData.append("jsonData", JSON.stringify(this.user));
        let response = await Axios.post(
          "http://localhost:3000/user/updateUser",
          formData
        );

        this.$showLoader(false);
        if (response.data.errorExist) {
          this.emailExist = response.data.duplicates.emailExists;
        } else {
          this.$snotify.success(response.data.message);
          this.$router.push("/");
        }
      } else {
        this.$snotify.error("Please fix the validation errors!");
      }
    } catch (error) {
      console.log(error);
      this.$showLoader(false);
      this.$snotify.error(error.message);
    }
  }

  public async getUserById() {
    try {
      this.$showLoader(true);
      let response = await Axios.get("http://localhost:3000/user/getUserById", {
        params: { userId: this.$route.query.userId },
      });
      this.$showLoader(false);
      this.user = response.data;
      this.imageSrc = this.user.profileImagePath
        ? "../../../../server/" + this.user.profileImagePath
        : null;
    } catch (error) {
      console.log(error);
      this.$showLoader(false);
    }
  }
  mounted() {
    if (this.$route.query.userId) this.getUserById();
  }
}
</script>
<style src="./UpdateUser.css">
</style>

