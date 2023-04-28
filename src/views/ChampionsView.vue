<script setup>
    import { ref, reactive } from "vue"
	import { useRouter } from "vue-router"
	import axios from "axios"
import { setMapStoreSuffix } from "pinia";

	const router = useRouter()
	let champions = ref({})
    const tags = [
        'Fighter',
        'Tank',
        'Mage',
        'Assassin',
        'Marksman',
        'Support'
    ]

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
        value: '',
        tag: [...tags]
    })

    const updateSearchValue = (event) => {
        search.value = event.target.value
    }

    const champ = {
        id: '',
        name: '',
        image: {
            full: ''
        },
        tags: []
    }

    const goToChamp = (name) => {
        router.push(`/champion/${name}`);
    }

    const changeTag = (tag) => {
        if(tag === 'All'){
            search.tag = [...tags]
        }else{
            search.tag = []
            search.tag.push(tag)
        }
    }

    const checkTags = (index) => {
        let check = champions.value[index]['tags'].includes(search.tag) ? true : false
        return check
    }

</script>

<template>

    <div id="container">

        <div id="champion-finder">
            <div id="finder-input">
                <input 
                type="text"
                v-model="search.value"
                @input="updateSearchValue"
                placeholder="Search the champion"
                >
            </div>
            <div id="finder-tags">

                <div
                :key="'All'"
                class="tag-box"
                @click="changeTag('All')"
                >
                    <span class="tag-text" :class="{'selected-tag': search.tag.length === 6}">All</span>
                </div>

                <div 
                v-for="tag in tags"
                :key="tag"
                class="tag-box"
                @click="changeTag(tag)"
                >
                    <span class="tag-text" :class="{'selected-tag': search.tag.includes(tag) && search.tag.length <= 2}">{{ tag }}</span>
                </div>

            </div>
        </div>

        <div id="champions-content">
            
            <div
            class="champion-info"
            v-for="(champ, ind) in champions"
            :key="champ['id']"
            :class="{'invisible': !champ['name'].toLowerCase().includes(search.value.toLowerCase()) || !champ.tags.some(r => search.tag.includes(r))}"
            @click="goToChamp(champ['id'])"
            >
            
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