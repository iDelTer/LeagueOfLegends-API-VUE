import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useChampionsStore = defineStore('champions', () => {
  let info = ref([])
  
  const getData = async (champ) => {
    if(champ){
        try{
            const { data } = await axios.get(
              `http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion/${champ}.json`
            );
            info.value = data
            console.log(`Pinia: ${info}`)
          } catch(e) {
            console.log(e)
            info.value = null
          }
    }else{
        try{
            const { data } = await axios.get(
              `http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json`
            );
            console.log(data)
            info.value = data
          } catch(e) {
            console.log(e)
            info.value = null
        }
    }

  }

  getData()

  return { info, getData }
})
