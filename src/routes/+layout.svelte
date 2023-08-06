<header class="header" />
<slot />
<footer />

<style lang="scss">
	:root {
		--theme-color-dark: black;
		--theme-color-light: white;
		--font-color-dark: black;
		--font-color-light: white;
		--space-xs: 1rem;
		--space-s: 2rem;
		--space-m: 3rem;
		--space-l: 4rem;
		--space-xl: 5rem;
	}

	.header {
		height: var(--space-l);
		background-color: var(--theme-color-dark);
	}
</style>
