export const DoClick4Emit = (emit: (event: 'do-click-4', ...args: any[]) => void) => {
	const arg1 = 1;
	emit('do-click-4', arg1);
};
