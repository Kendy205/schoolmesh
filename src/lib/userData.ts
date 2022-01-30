import { writable } from "svelte/store";


const userData = writable<{uid: string, username?: string, displayName: string, photoURL: string, }>()

export default{
  subscribe: userData.subscribe,
  set:userData.set
} 