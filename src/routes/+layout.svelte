<script>
// @ts-nocheck

	import '../app.css';
	import { auth } from '$lib/firebase';
	import {  onMount } from 'svelte';
	import { doc, getDoc,setDoc} from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { authStore } from '../store/store';
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
			if(!user) {
				return;
			}
			let dataTosetToStore;
			const docref = doc(db, 'users', user.uid);
			const docsnap = await getDoc(docref);
			if (!docsnap.exists()) {
				console.log("Creating User");
				const userRef = doc(db, 'users', user.uid);
				dataTosetToStore = {
					email: user.email,
					password: user.uid,
					nickname:""
				};
				await setDoc(
					userRef,
					dataTosetToStore,
					{ merge: true }
				);
			} else {
				const userData = docsnap.data();
				dataTosetToStore =userData
			}
			authStore.update(curr =>{
				return{
					...curr,
					user,
					data:dataTosetToStore,
					loading : false,
				}
			})
		});
		return unsubscribe;
	});
	
</script>

<div
	class="fixed h-full w-full bg-gradient-to-bl from-indigo-900/80 from-10% via-red-500/80 via-70% to-orange-500/60 font-popping "
>
<slot />
</div>
