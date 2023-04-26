<script setup>
	import { ref, onMounted } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { useChampionsStore } from "@/stores/champions"
    import axios from "axios"

	const route = useRoute()
	const router = useRouter()
	const champ = route.params.name
    const champion = ref({})

	const getData = async (champ) => {
		try {
			const { data } = await axios.get(
				`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion/${champ}.json`
			)
			champion.value = data
            console.log(data)
		} catch (e) {
			console.log(e)
            champion.value = null
		}
	}

    getData(champ)

	const back = () => {
		router.push("/pokemons")
	}

	const splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`
    const image = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${champ}.png`

</script>

<template>
	<div id="champion-content">

		<div id="champ-title">
            <h1>{{ champ }}</h1>
        </div>

        <div id="champ-info">

            <div id="champ-picture">
                <img :src="splash">
            </div>

            <div id="champ-description">
                <p>{{ champion.data[champ].blurb }}</p>
            </div>

        </div>

        <div id="champ-abilities">

            <div id="champ-spells">

                <div class="champ-spell" id="champ-passive">
                    <p>{{ champion.data[champ].passive.name }}</p>
                    <img 
                    :src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/${champion.data[champ].passive.image.full}`"
                    class="abilities-pictures"
                    >
                </div>

                <div 
                class="champ-spell"
                v-for="spell in champion.data[champ].spells"
                >
                    <p>{{ spell.name }}</p>
                    <img 
                    :src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${spell.image.full}`"
                    class="abilities-pictures"
                    >
                </div>

            </div>

        </div>

	</div>
</template>

<style scoped>
    @import './champion.css'
</style>
