<script setup>
	import { ref, reactive } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import axios from "axios"

	const route = useRoute()
	const router = useRouter()

	const itemId = route.params.id
	const items = ref({})
	const item = ref({})

	const getData = async () => {
		try {
			const { data } = await axios.get(
				`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/item.json`
			)
			items.value = data
			item.value = data["data"][itemId]
			console.log(data)
		} catch (e) {
			console.log(e)
			items.value = null
			item.value = null
		}
	}
	getData()

	const goToItem = (id) => {
		router.push(`/item/${id}`)
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

			<div id="item-description">
				<p>{{ item.plaintext }}</p>
			</div>

			<div id="item-prices">
				<p>
					<span>Buy: </span>{{ item.gold.base }} <span>Sell: </span
					>{{ item.gold.sell }}
				</p>
			</div>

			<div id="item-into">
				<div id="into-text">
					<p>This object can be upgraded to</p>
				</div>
				<div id="into-items">
					<div
						v-for="(it, index) in item.into"
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
