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
	import { onDestroy } from 'svelte';
	import { auth } from '$lib/firebase';
	import { authHandlers } from '../store/store';

	let messagesData = [];
	let mess;
	const messageRef = collection(db, 'messages');

	const unsubscribe = onSnapshot(
		query(messageRef, orderBy('time', 'desc'), limit(20)),
		(querysnap) => {
			messagesData = [];
			querysnap.forEach((snap) => {
				messagesData.push(snap.data());
				messagesData = messagesData;
			});
		}
	);

	function sendMess() {
		if (mess && mess != '') {
			addDoc(messageRef, {
				text: mess,
				uid: auth.currentUser.uid,
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
	onDestroy( ()=>{
		authHandlers.logout()
	})
</script>

<div class=" flex h-screen w-screen flex-col items-center justify-center">
	<div class="flex h-4/6 w-5/6 flex-col md:w-3/5 lg:w-2/5">
		<div class="flex flex-1 flex-col-reverse overflow-y-auto rounded-xl bg-white p-3 shadow-sm">
			<ul data-test ="messages_list"/>
			{#if messagesData}
				{#each messagesData as messdata}
					<li class="list-none">
						<div
							class="relative flex flex-row {auth.currentUser.uid == messdata.uid
								? 'justify-end'
								: 'justify-start'} my-0.5 break-normal"
						>
							<p
								class=" w-fit rounded-xl {auth.currentUser.uid == messdata.uid
									? 'bg-blue-600'
									: 'bg-pink-500'} mx-2 px-3 py-1 font-light text-white break-words max-w-[60%] "
							>
								{messdata.text}
							</p>
						</div>
					</li>
				{/each}
			{/if}
		</div>
		<div class="my-2 flex">
			<input
				type="text"
				bind:value={mess}
				class="flex-1 rounded-xl bg-slate-200 p-2 transition focus:scale-105 focus:border-none focus:outline-none"
				placeholder="Aa"
				data-test="message_input"
				on:keydown={(keyp) => {
					if (keyp.key == 'Enter') {
						sendMess();
					}
				}}
			/>
			<button data-test ="send_button" on:click={sendMess} class="rounded-md bg-pink-600/10 ml-1 px-3 font-semibold text-4xl text-white">></button>
		</div>
		<div>
			<button on:click={deletleallmess} class="text-white" data-test ="delete_button">Delele All</button>
		</div>
	</div>
</div>
