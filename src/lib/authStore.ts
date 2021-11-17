import type { UserInfo } from "@firebase/auth";
import { writable } from "svelte/store";


const authStore = writable<{
  isLoggedIn: boolean,
  user?: UserInfo,
}>({
  isLoggedIn: false,
});

export default{
  subscribe: authStore.subscribe,
  set:authStore.set
} 