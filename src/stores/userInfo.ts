import { writable } from "svelte/store";

const userInfo = writable<{privateInfo?}>({})

export default{
  set:userInfo.set,
  subscribe: userInfo.subscribe
}