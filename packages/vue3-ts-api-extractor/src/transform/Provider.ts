import { SfcComment } from '../parser/comment/basic/SfcComment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Provider<R = unknown> {
	abstract to(comment: SfcComment): R;
}
