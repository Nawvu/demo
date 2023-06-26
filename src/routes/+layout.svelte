<script>
	// @ts-nocheck
	import '../app.css';
	import { auth } from '$lib/firebase';
	import { onMount } from 'svelte';
	const nonauthroutes = ['/'];

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;
			if (!user && !nonauthroutes.includes(currentPath)) {
				window.location.href = '/';
			}
			if (user && currentPath === '/') {
				window.location.href = '/main';
			}
			if (!user) {
				return;
			}
			return unsubscribe();
		});
	});
</script>

<div
	class="fixed h-full w-full bg-gradient-to-bl from-indigo-900/80 from-10% via-red-500/80 via-70% to-orange-500/60 font-popping"
>
	<slot />
</div>
