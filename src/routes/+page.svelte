<script>
	// @ts-nocheck
	import { auth, db } from '$lib/firebase';
	import { serverTimestamp, collection } from 'firebase/firestore';
	import { doc, setDoc, query, onSnapshot, deleteDoc, addDoc } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	import { googleProvider } from '$lib/firebase';
	import { signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
	let thing;
	let unsubscribe;
	let foods = [];
	let signIn = true;
	let userID;
	let background;
	const q = query(collection(db, 'things'));
	unsubscribe = onSnapshot(q, (querySnapshot) => {
		foods = [];
		querySnapshot.forEach((doc) => {
			foods.push(doc);
			foods = foods;
		});
	});
	onDestroy(() => {
		unsubscribe();
	});
	auth.onAuthStateChanged((user) => {
		if (user) {
			signIn = true;
			userID = user.uid;
		} else {
			signIn = false;
			userID = null;
		}
	});
	function deletefoo(food) {
		deleteDoc(doc(db, 'things', food.id));
	}
</script>

{#if !signIn}
	<h3>Misery anguish</h3>
	<div class="flex items-center flex-col">
		<section
			id="whenSignedOut"
			class="
		 m-10 bg-gray-700 p-5 rounded-xl shadow-gray-600 w-fit"
		>
			<button
				id="signButon"
				class=" capitalize font-semibold text-white text-4xl"
				on:click={async () =>
					await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver)}
			>
				Đăng nhập với google
			</button>
		</section>
	</div>
{:else if signIn}
	<div class="flex flex-col items-center min-h-screen max-h-full justify-center bg-white border-solid ">
		<div class="">
			<section id="whenSignedIn" hidden />
			<div class="flex flex-col justify-stretch">
				<div>
					<input
						type="text"
						name=""
						id=""
						bind:value={thing}
						placeholder="Nhập tin nhắn"
						class="  rounded-md p-2 drop-shadow-2xl shadow-black border-solid"
					/>
					<button
						on:click={() => {
							const eventRef = collection(db, 'things');
							addDoc(
								eventRef,
								{ name: thing, time: serverTimestamp(), uid: userID },
								{ merge: true }
							);
							thing = '';
						}}
						class="bg-cyan-600 text-white px-3 py-1 font-bold rounded-md hover:scale-105 hover:bg-slate-500 transition-colors duration-300"
						>Gửi
					</button>
				</div>
				<div class=" mt-3 flex flex-col border-b items-stretch w-full">
					{#each foods.reverse() as food}
						{#if food.data().uid == userID}
							<div class="flex flex-row justify-between bg-blue-500 rounded-xl p-2 w-full my-1 text-white shadow-cyan-950">
								<p class="font-semibold">{food.data().name}</p>
								<button on:click={deletefoo(food)} class="font-semibold">delete</button>
							</div>
						{:else}
							<div class="flex flex-row justify-between bg-white 0 rounded-xl p-2 w-full my-1 shadow-lg text-blue-900">
								<p class="font-semibold">{food.data().name}</p>
								<button on:click={deletefoo(food)} class="font-semibold">delete</button>
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<button
				on:click={() => {
					auth.signOut();
				}}
				class="bg-orange-400 text-white font-bold p-2 rounded-xl my-2"
				>Đăng Xuất
			</button>
		</div>
	</div>
{/if}
