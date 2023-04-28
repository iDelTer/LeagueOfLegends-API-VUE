<script setup>
    import { ref } from "vue"
	import { useRouter } from "vue-router"
	import axios from "axios"

	const router = useRouter()
    const all = ref({})
	const items = ref({})
    const nameFilter = [
        '<rarityLegendary>',
        'GangPlank Placeholder',
        'Bounty',
        'Fortification',
        'Super Mech Power Field',
        'Overcharged',
        'Tower Power-Up',
        'Turret Plating',
        'Vanguard',
        'Anti-tower Socks',
        'Gusto'
    ]

	const getData = async () => {
		try {
			const { data } = await axios.get(
				`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/item.json`
			)
            all.value = data
			items.value = data['data']
		} catch (e) {
			console.log(e)
			items.value = null
		}
	}
    getData()

    const goToItem = (itemId, ind) => {
        let allItems = []
        itemId = String(itemId)
        let splitted = itemId.split(",")
        splitted.map(h => {
            allItems.push(h)
        })
        router.push(`/item/${ind}`)
    }
    
</script>

<template>

    <div id="container">

        <div id="items-finder">
            <div id="finder-input">
                <input 
                type="text"
                placeholder="Search the item"
                >
            </div>
        </div>

        <div id="items-content">

            <div
            class="item-info"
            v-for="(item, index) in items"
            :key="item.name"
            :class="{'invisible': nameFilter.some(el => item.name.includes(el))}"
            @click="goToItem(Object.keys(items), index)"
            >
                <div class="item-name">
                    {{ item.name }}
                </div>

                <div class="item-picture">
                    <img :src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${item.image.full}`">
                </div>

            </div>

        </div>

    </div>

</template>

<style scoped>
    @import './items.css'    
</style>