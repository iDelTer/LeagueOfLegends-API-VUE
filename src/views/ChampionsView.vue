<script setup>
    import { ref, reactive } from "vue"
	import { useRouter } from "vue-router"
	import axios from "axios"

	const router = useRouter()
	const champions = ref({})
    const tags = [
        'All',
        'Fighter',
        'Tank',
        'Mage',
        'Assasin',
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
        tag: 'All'
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
        search.tag = tag
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
                v-for="tag in tags"
                :key="tag"
                class="tag-box"
                @click="changeTag(tag)"
                >
                    <span class="tag-text" :class="{'selected-tag': tag === search.tag}">{{ tag }}</span>
                </div>

            </div>
        </div>

        <div id="champions-content" :class="{'invisible': search.tag === 'All'}">
            
            <div
            class="champion-info"
            v-for="champ in champions"
            :key="champ['id']"
            :class="{'invisible': !champ['name'].toLowerCase().includes(search.value.toLowerCase())}"
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

        <div id="champions-content" :class="{'invisible': search.tag !== 'All'}">
            
            <div
            class="champion-info"
            v-for="(champ, ind) in champions"
            :key="champ['id']"
            :class="{'invisible': !champ['name'].includes(search.value) || !champ['tags'].includes(search.value)}"
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