<script setup>
    import { ref, reactive } from "vue"
	import { useRouter } from "vue-router"
	import axios from "axios"

	const router = useRouter()
	const champions = ref({})

	const getData = async () => {
		try {
			const { data } = await axios.get(
				`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json`
			)
			champions.value = data['data']
            console.log(champions.value)
		} catch (e) {
			console.log(e)
			champions.value = null
		}
	}
    getData()

    const search = reactive({
        isSearching: false,
        value: ''
    })

    const updateSearchValue = (event) => {
        search.value = event.target.value
        search.value.length > 0 ? search.isSearching = true : search.isSearching = false
        console.log(search.value)
    }

    const champ = {
        id: '',
        name: '',
        image: {
            full: ''
        }
    }

    const goToChamp = (name) => {
        router.push(`/champion/${name}`);
    }

</script>

<template>

    <div id="container">

        <div id="champion-finder">
            <input 
            type="text"
            v-model="search.value"
            @input="updateSearchValue"
            placeholder="Search the champ"
            >
        </div>
        <!-- @change="search.value = $event.target.value" -->

        <div id="champions-content">
            
            <div
            class="champion-info"
            v-for="champ in champions"
            :key="champ['id']"
            :class="{'invisible': !champ['name'].toLowerCase().includes(search.value.toLowerCase())}"
            @click="goToChamp(champ['id'])"
            >
            <!-- v-if="champ['name'].toLowerCase().includes(search.value.toLowerCase())" -->
                <div class="champion-name">
                    <p>{{ champ.name }}</p>
                </div>

                <div class="champion-picture">
                    <img :src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${champ.image.full}`">
                </div>
            
            </div>

        </div>

    </div>

</template>

<style scoped>
    @import './champions.css'
</style>