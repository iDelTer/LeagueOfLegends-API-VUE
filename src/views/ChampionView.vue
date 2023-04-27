<script setup>
	import { ref, reactive } from "vue"
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

    let spellData = reactive({
        type: 'passive', 
        index: 0
    })

    const changeSpellVisualization = (type, i) => {
        spellData.type = type
        spellData.index = i
    }

    const keys = Object.freeze({
        'passive': 'Passive',
        '0': 'Q',
        '1': 'W',
        '2': 'E',
        '3': 'R',
    })


</script>

<template>
	<div id="champion-content">
		<div id="champ-title">
			<h1>{{ champ }}</h1>
		</div>

		<div id="champ-info">
			<div id="champ-picture">
				<img :src="splash" />
			</div>

			<div id="champ-description">
				<p>{{ champion.data[champ].blurb }}</p>
			</div>
		</div>

		<div id="champ-abilities">

			<div id="champ-spells">

				<div class="champ-spell">
					<p class="abilities-name">{{ champion.data[champ].passive.name }} - {{ keys['passive'] }}</p>
					<img
						:src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/${champion.data[champ].passive.image.full}`"
						class="abilities-pictures passive-picture"
                        @click="changeSpellVisualization('passive', 0)"
					/>
				</div>
            
                <div
                    class="champ-spell"
                    v-for="(spell, ind) in champion.data[champ].spells"
                >
                    <p class="abilities-name">{{ spell.name }} - {{ keys[ind] }}</p>
                    <img
                            :src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${spell.image.full}`"
                            class="abilities-pictures"
                            @click="changeSpellVisualization('spell', ind)"
                    />
                </div>
            </div>

            <div id="spells-visualization" v-if="spellData.type === 'passive'">

                <div id="spell-picture">
                    <img
						:src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/${champion.data[champ].passive.image.full}`"
						class="spell-visualization-picture"
					/>
                </div>

                <div id="spell-description">
                    {{ champion.data[champ].passive.description }}
                </div>

            </div>

            <div id="spells-visualization" v-else-if="spellData.type === 'spell'">

                <div id="spell-picture">
                    <img
                        :src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${champion.data[champ].spells[spellData.index].image.full}`"
                        class="spell-visualization-picture"
                    />
                </div>

                <div id="spell-description">
                    <p class="spell-visualization-description">{{ champion.data[champ].spells[spellData.index].description }}</p>
                </div>

            </div>

		</div>
	</div>
</template>

<style scoped>
	@import "./champion.css";
</style>
