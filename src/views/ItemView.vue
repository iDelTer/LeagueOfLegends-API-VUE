<script setup>
	import { ref } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import axios from "axios"

	const route = useRoute()
	const router = useRouter()

	const paramId = route.params.id
	const itemId = ref('')
	const items = ref({})
	const item = ref({})

	const changeItemId = (identifier) => {
		itemId.value = identifier
	}

	changeItemId(itemId)

	const getData = async () => {
		try {
			const { data } = await axios.get(
				`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/item.json`
			)
			items.value = data
			item.value = data['data'][paramId]
		} catch (e) {
			console.log(e)
			items.value = null
			item.value = null
		}
	}
	getData()

	const newItem = (identifier) => {
		item.value = items.value['data'][`${identifier}`]
	}

	const goToItem = (identifier) => {
		router.push({ name: 'Item', params: { id: identifier } })
		changeItemId(identifier)
		newItem(identifier)
	}
</script>

<template>
	<div id="item-content">
		<div id="item-picture">
			<img
				:src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${item.image.full}`"
			/>
		</div>

		<div id="item-info">
			<div id="item-name">
				<p>{{ item.name }}</p>
			</div>

			<div id="item-description" >
				<p v-if="item.description">{{ item.plaintext }}</p>
				<p v-else>No description available</p>
			</div>

			<div id="item-prices">
				<p>
					<span>Buy: </span>{{ item.gold.total }} <span>Sell: </span
					>{{ item.gold.sell }}
				</p>
			</div>

			<div id="item-into">
				<div id="into-text">
					<p v-if="item.into">This object can be upgraded to</p>
					<p v-else>This object cannot be upgraded</p>
				</div>

				<div id="into-items">
					<div
						v-for="(it) in item.into"
						:key="it"
						class="into-item"
					>
						<div class="into-picture" @click="goToItem(it)">
							<img
								:src="`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items.data[it].image.full}`"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import "./item.css";
</style>
