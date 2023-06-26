<script>
	import { authHandlers } from '../store/store';
</script>

<div class="fixed">
	<div
		class="box-border flex flex-row items-center justify-between border-b-8 border-blue-500 bg-white px-5 py-3 w-screen"
	>
		<nav>
			<h1>Demo Nhóm 2</h1>
		</nav>
		<button on:click={authHandlers.logout} class="rounded-xl bg-indigo-600 p-2 text-white"
			>Đăng xuất</button
		>
	</div>
</div>
