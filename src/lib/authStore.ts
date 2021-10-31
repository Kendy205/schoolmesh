import { writable } from "svelte/store";


const authStore = writable<{
  isLoggedIn: boolean,
  user?: any,
}>({
  isLoggedIn: false,
});

export default{
  subscribe: authStore.subscribe,
  set:authStore.set
} 