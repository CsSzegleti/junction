export class IllegalDbStateError extends Error {
	constructor() {
		super('Primary key violation');
	}
}
