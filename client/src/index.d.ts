import { SnotifyService } from 'vue-snotify/SnotifyService';
import { Validator } from 'vee-validate'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $snotify: SnotifyService,
    $validator: Validator;
    readonly $moment: any;
    readonly $showLoader: (value: boolean) => void;

  }
}
