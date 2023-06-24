<script>
	import { auth, googleProvider } from '$lib/firebase';
	import { signInWithPopup } from 'firebase/auth';
</script>

<div class="flex items-center flex-col">
	<section
		id="whenSignedOut"
		class="
		 m-10 bg-gray-700 p-5 rounded-xl shadow-gray-600 w-fit "
	>
		<button
			id="signButon"
			class=" capitalize font-semibold text-white text-4xl"
			on:click={() => signInWithPopup(auth, googleProvider)}
		>
			Sign with google
		</button>
	</section>
</div>
