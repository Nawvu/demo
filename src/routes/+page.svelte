<script>
	// @ts-nocheck
	import { googleProvider, auth, db } from '../lib/firebase';
	import { signInWithPopup } from 'firebase/auth';
	import { serverTimestamp, collection } from 'firebase/firestore';
	import { doc, setDoc, query, onSnapshot } from 'firebase/firestore';

	let thing;
	let unsubscribe;
	let foods = [];
	const q = query(collection(db, 'things'));
	unsubscribe = onSnapshot(q, (querySnapshot) => {
		foods = []
		querySnapshot.forEach(doc => {
			foods.push(doc.data() );
			foods = foods
		});
	});
</script>

<section id="whenSignedOut">
	<button id="signButon" class="bg-gray-400" on:click={() => signInWithPopup(auth, googleProvider)}>
		Sign with google
	</button>
</section>

<section id="whenSignedIn" hidden />
<div>
	<input type="text" name="" id="" bind:value={thing} class=" border rounded-md" />
	<button
		on:click={() => {
			console.log(thing);
			const eventRef = doc(db, 'things', thing);
			setDoc(eventRef, { food: thing, time: serverTimestamp() }, { merge: true });
		}}>Add</button
	>
	<div class="text-black">
		{#each foods as food(food) }
			<p>{food.food}</p>
		{/each}
		<p>Hi</p>
	</div>
</div>
