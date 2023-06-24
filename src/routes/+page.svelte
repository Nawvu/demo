<script>
	// @ts-nocheck
	import { auth, db } from '$lib/firebase';
	import { serverTimestamp, collection } from 'firebase/firestore';
	import { doc, setDoc, query, onSnapshot, deleteDoc } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	import Googlelog from '../components/googlelog.svelte';

	let thing;
	let unsubscribe;
	let foods = [];
	let signIn = true;
	const q = query(collection(db, 'things'));
	unsubscribe = onSnapshot(q, (querySnapshot) => {
		foods = [];
		querySnapshot.forEach((doc) => {
			foods.push(doc.data());
			foods = foods;
		});
	});
	onDestroy(() => {
		unsubscribe();
	});
	auth.onAuthStateChanged((user) => {
		if (user) {
			signIn = true;
		} else {
			signIn = false;
		}
	});
	function deletefoo(food) {
		console.log(food.name);
		deleteDoc(doc(db, 'things', food.name));
	}
</script>

{#if !signIn}
	<Googlelog />
{:else if signIn}
	<div class="flex flex-col items-center h-screen justify-center ">
		<div class="">
			<button
				on:click={() => {
					auth.signOut();
					signIn =false;
				}}
				class="bg-orange-400 text-white font-bold p-2 rounded-xl m-3"
				>Sigg Out
			</button>
			<section id="whenSignedIn" hidden />
			<div class="flex flex-col justify-stretch">
				<div>
					<input type="text" name="" id="" bind:value={thing} class="  rounded-md" />
					<button
						on:click={() => {
							console.log(thing);
							const eventRef = doc(db, 'things', thing);
							setDoc(eventRef, { name: thing, time: serverTimestamp() }, { merge: true });
							thing = '';
						}}
						class="bg-blue-950 text-white px-3 font-bold rounded-md hover:scale-105 hover:bg-slate-500 transition-colors duration-300"
						>Add
					</button>
				</div>
				<div class="bg-white mt-3 p-3 flex flex-col border-b items-stretch w-full">
					{#each foods as food (food)}
						<div class="flex flex-row justify-between">
							<p class="font-semibold">{food.name}</p>
							<button on:click={deletefoo(food)}>Delete</button>
						</div>
					{/each}
					<p>Hi</p>
				</div>
			</div>
		</div>
	</div>
{/if}
