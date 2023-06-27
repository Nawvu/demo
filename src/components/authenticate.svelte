<script>
	// @ts-nocheck

	import { authHandlers } from '../store/store';
	const input =
		'cursor-default w-full p-2 border-none bg-red-100/20 placeholder-gray-50 focus:border-none focus:outline-none  shadow-sm shadow-pink-500 focus:bg-transparent focus:text-white text-white px-2 py-4 autofill:bg-transparent autofill:text-white focus:cursor-text';

	let email = '';
	let password = '';
	let confirmPass = '';
	let error = false;
	let errorText;
	let regisrer = false;
	let authenicating = false;
	async function handlerAuthenticate() {
		if (authenicating) {
			return;
		}
		if (!email || !password || (regisrer && confirmPass != password)) {
			if (confirmPass != password) {
				errorText = '*Sai Mật khẩu';
			} else {
				errorText = '*Chưa nhập đủ';
			}
			error = true;
			return;
		}

		authenicating = true;
		try {
			if (!regisrer) {
				await authHandlers.login(email, password);
			} else {
				await authHandlers.signup(email, password);
			}
		} catch (err) {
			if (err.message.toString() == 'Firebase: Error (auth/invalid-email).') {
				errorText = '*Sai cú pháp email';
			} else if (err.message.toString() == 'Firebase: Error (auth/wrong-password).') {
				errorText = '*Sai mật khẩu';
			} else if (err.message.toString() == 'Firebase: Error (auth/user-not-found).') {
				errorText = '*Tài khoản không tồn tại';
			} else {
				errorText = '*Có gì sai sai!';
			}
			error = true;
			authenicating = false;
		}
	}
	function handlerRegister() {
		regisrer = !regisrer;
	}
</script>

<div class="relative flex min-h-screen flex-1 flex-col items-center justify-center">
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<form
		action=""
		class=" flex w-[400px] max-w-[100%] flex-col items-center gap-4"
		on:keydown={(keyp) => {
			if (keyp.key == 'Enter') {
				handlerAuthenticate();
			}
		}}
	>
		<h1
			class="cursor-default text-[3rem] font-semibold text-white drop-shadow-xl"
			data-test="login_header"
		>
			{regisrer ? 'Đăng ký' : 'Đăng nhập'}
		</h1>
		<label for="" class="relative w-[100%] rounded-md transition hover:scale-105">
			<input
				type="email"
				placeholder="Email"
				class="{input} "
				bind:value={email}
				data-test="email_input"
			/>
		</label>
		<label for="" class="relative w-[100%] rounded-md transition hover:scale-105">
			<input
				type="password"
				placeholder="password "
				class={input}
				bind:value={password}
				data-test="password_input"
			/>
		</label>
		{#if regisrer}
			<label for="" class="relative w-[100%] rounded-md transition hover:scale-105">
				<input
					type="password"
					placeholder="comfirm password "
					class={input}
					bind:value={confirmPass}
					data-test="comfirm_password_input"
				/>
			</label>
		{/if}

		{#if error}
			<p
				class=" max-w-fit rounded-full bg-orange-500 px-3 py-1 text-justify font-semibold text-white"
			data-test="error"
				>
				{errorText}
			</p>
		{/if}
		<button
			on:click={handlerAuthenticate}
			class="w-fit cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-lg font-semibold text-white transition hover:bg-blue-500"
			data-test="summit_button"
			>
			{#if authenicating}
				Loading
			{:else}
				{regisrer ? 'Tạo tài khoản' : 'Đăng nhập'}
			{/if}
		</button>
	</form>
	<div class="flex flex-col items-center justify-center">
		<div class="m-5 flex w-[400px] flex-row justify-center text-white drop-shadow-sm">
			{#if !regisrer}
				<p>Không có tài khoản?</p>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<button
					on:click={handlerRegister}
					class="ml-2 cursor-pointer font-semibold transition-transform duration-200 ease-out hover:scale-110 hover:text-orange-300"
					data-test="dang_ky"
				>
					Đăng ký
				</button>
			{:else}
				<p>Đã có tài khoản</p>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<button
					on:click={handlerRegister}
					class="ml-2 cursor-pointer font-semibold transition-transform duration-200 ease-out hover:scale-110 hover:text-orange-300"
					data-test="dang_nhap"
				>
					Đăng nhập
				</button>
			{/if}
		</div>
	</div>
</div>
