<script>
	import { authHandlers } from '../store/store';
</script>

<div class="fixed">
	<div
		class="box-border flex w-screen flex-row items-center justify-between border-b-8 border-blue-500 bg-white px-5 py-3"
	>
		<h1>Demo Nhóm 2</h1>
		<button data-test ="dang_xuat" on:click={authHandlers.logout} class="rounded-xl bg-indigo-600 p-2 text-white"
			>Đăng xuất</button
		>
	</div>
</div>
