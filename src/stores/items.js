import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useItemsStore = defineStore('items', () => {
  const items = ref({})
  
  const getData = async () => {
    try{
      const { data } = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/item.json`
      );
      console.log(data)
      items.value = data
    } catch(e) {
      console.log(e)
      items.value = null
    }
  }
  getData()

  return { items, getData }
})
