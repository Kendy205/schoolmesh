import { writable } from "svelte/store";


const privateData = writable<{email:string, uid: string, username?: string}>()

export default{
  subscribe: privateData.subscribe,
  set:privateData.set
} 