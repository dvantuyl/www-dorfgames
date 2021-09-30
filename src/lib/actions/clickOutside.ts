export function clickOutside(node: HTMLElement): { destroy: () => void } {
	function handleClick(event) {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click-outside'));
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy(): void {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
