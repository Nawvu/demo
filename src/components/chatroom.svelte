<script>
	// @ts-nocheck
	import { db } from '$lib/firebase';
	import {
		addDoc,
		collection,
		deleteDoc,
		doc,
		getDocs,
		limit,
		onSnapshot,
		orderBy,
		query,
		serverTimestamp
	} from 'firebase/firestore';
	import { authStore } from '../store/store';
	import { onDestroy } from 'svelte';
    import { auth } from '$lib/firebase';
	let currUser;
	let userData;
	let messagesData = [];
	let mess;
	const messageRef = collection(db, 'messages');
	authStore.subscribe((curr) => {
		currUser = curr.user;
		userData = curr.data;
	});

	const unsubscribe = onSnapshot(
		query(messageRef, orderBy('time', 'desc'), limit(10)),
		(querysnap) => {
			messagesData = [];
			querysnap.forEach((snap) => {
				messagesData.push(snap.data());
				messagesData = messagesData;
			});
		}
	);
	onDestroy(() => {
		unsubscribe();
	});
	function sendMess() {
		if (mess && mess != '') {
			addDoc(messageRef, {
				text: mess,
				uid: currUser.uid,
				time: serverTimestamp()
			});
		}
		mess = null;
	}
	async function deletleallmess() {
		const docRef = await getDocs(query(messageRef, 'messages'));
		docRef.forEach(async (docr) => {
			await deleteDoc(doc(db, 'messages', docr.id));
		});
	}
</script>

<div class=" flex h-screen w-screen flex-col items-center justify-center">
	<div class="flex h-4/6 w-5/6 flex-col bg-pink-400 md:w-3/5 lg:w-2/5">
		<div class=" flex flex-1 flex-col justify-end overflow-y-auto bg-white p-1">
			{#if messagesData}
				{#each messagesData.reverse() as messdata}
					<p class=" flex {auth.currentUser.uid == messdata.uid ? 'justify-end' : 'justify-start'}">
						{messdata.text}
					</p>
				{/each}
			{/if}
		</div>
		<div class="flex">
			<input type="text" bind:value={mess} class="flex-1 p-2" />
			<button on:click={sendMess}>Send</button>
		</div>
		<div>
			<button on:click={deletleallmess}>Delele All</button>
		</div>
	</div>
</div>
