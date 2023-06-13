import { BasicCommentKind } from './BasicComment';
import { EventComment } from './EventComment';

export class SlotComment extends EventComment {
    public kind: BasicCommentKind = BasicCommentKind.SLOT;
}
