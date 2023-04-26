<script setup>
	import { RouterLink, RouterView } from "vue-router"
</script>

<template>
	<div id="navbar">
        <nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/champions">Champions</RouterLink>
			<RouterLink to="/items">Items</RouterLink>
		</nav>
    </div>
	<div id="content">
		<RouterView />
	</div>
</template>

<style scoped>
	
</style>
