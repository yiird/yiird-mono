import { tsquery } from '@phenomnomnominal/tsquery';
import { AttributeNode, DirectiveNode, SimpleExpressionNode } from '@vue/compiler-core';
import { camelCase, isString, reverse, uniqBy } from 'lodash-es';
import ts, { Identifier, MethodDeclaration, Node, ReturnStatement } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { NodeUtils } from '../../../common/NodeUtils';
import { SfcFile } from '../../../common/SfcFile';
import { Utils } from '../../../common/Utils';
import { ExportNode } from '../../node/ExportNode';
import { SfcStructure } from '../../node/SfcStructure';
import { TemplateSlotNode } from '../../node/TemplateSlotNode';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { CommentParserFactory } from '../CommentParserFactory';
import { NodeCommentParserFactory } from '../NodeCommentParserFactory';
import { EventComment } from '../basic/EventComment';
import { MethodComment } from '../basic/MethodComment';
import { PropComment } from '../basic/PropComment';
import { SfcComment } from '../basic/SfcComment';
import { SlotComment } from '../basic/SlotComment';
import { PropertyComment } from '../node/PropertyComment';
import { TypeComment } from '../node/TypeComment';

const SpecialAttr = ['is', 'ref', 'key', 'name'];

export class SfcCommentParser extends AbstractCommentParser<SfcComment> {
    private _propPaser = CommentParserFactory.createPropParser(this.structure, this.context);
    private _methodPaser = CommentParserFactory.createMethodParser(this.structure, this.context);
    private _emitsPaser = CommentParserFactory.createEmitsParser(this.structure, this.context);
    private _eventPaser = CommentParserFactory.createEventParser(this.structure, this.context);
    private _typePaser = NodeCommentParserFactory.createTypeParser(this.structure, this.context);

    private _searchNodes: Node[] = [];
    parse(node: ExportNode) {
        this._typePaser.init();

        const sfcNode = node.projection || node.root;
        const jsdocs = JsdocUtils.getJsDoc(node.root);
        const jsdoc = jsdocs[0];

        const comment = new SfcComment();

        const scriptFile = <SfcFile>this.context.getScriptFile(this.structure.filename);
        comment.additional = scriptFile.customBlocks
            ?.filter((block) => block.type === 'docs')
            .map((block) => {
                const content = block.content.trim();
                if (!comment.vitepress_frontmatter) {
                    if (content.startsWith('---')) {
                        const mached = content.match(/---\n(.*?)\n---/s);
                        if (mached) {
                            comment.vitepress_frontmatter = mached[0];
                            return content.replace(mached[0], '\n');
                        }
                    }
                }
                return block.content;
            });

        const methods = new Array<MethodComment>();
        const emits = new Array<EventComment>();

        if (ts.isCallExpression(sfcNode)) {
            if (ts.isObjectLiteralExpression(sfcNode.arguments[0])) {
                sfcNode.arguments[0].properties.forEach((componentOptionItem) => {
                    if (ts.isPropertyAssignment(componentOptionItem)) {
                        switch (componentOptionItem.name.getText()) {
                            case 'name': {
                                comment.name = NodeUtils.getText(componentOptionItem.initializer);
                                break;
                            }
                            case 'props': {
                                comment.props = this._handleProps(componentOptionItem.initializer);
                                break;
                            }
                            case 'methods': {
                                methods.push(...this._handleMthods(componentOptionItem.initializer));
                                break;
                            }
                            case 'emits': {
                                emits.push(...this._handleEmits(componentOptionItem.initializer));
                                break;
                            }
                        }
                    } else if (ts.isMethodDeclaration(componentOptionItem)) {
                        if ('setup' === componentOptionItem.name.getText()) {
                            this._searchNodes.push(componentOptionItem);

                            methods.push(...this._handleSetupMethod(componentOptionItem));
                        }
                    }
                });
            }
        }

        comment.methods = methods;

        comment.events = this._handleEvents(emits);

        comment.slots = this._handleSlots();

        if (jsdoc) {
            const nameTag = JsdocUtils.getTag('name', jsdoc);
            if (nameTag) {
                comment.name = JsdocUtils.getDescription(nameTag);
            }

            const authorTag = JsdocUtils.getTag('author', jsdoc);
            comment.author = authorTag ? JsdocUtils.getDescription(authorTag) : undefined;
            const dateTag = JsdocUtils.getTag('date', jsdoc);
            comment.date = dateTag ? JsdocUtils.getDescription(dateTag) : undefined;
            comment.description = JsdocUtils.getDescription(jsdoc);
        }

        return comment;
    }

    private _handleEmits(inputNode: Node) {
        const emits: Array<EventComment> = [];
        if (ts.isObjectLiteralExpression(inputNode)) {
            inputNode.properties.forEach((property) => {
                if (ts.isSpreadAssignment(property)) {
                    emits.push(...this._handleEmits(property.expression));
                    this._handleReplaceType(property, emits);
                } else {
                    emits.push(this._emitsPaser.parse(property));
                }
            });
        } else if (ts.isArrayLiteralExpression(inputNode)) {
            inputNode.elements.forEach((element) => {
                emits.push(this._emitsPaser.parse(element));
            });
        } else if (ts.isIdentifier(inputNode)) {
            //处理定义引用标识
            emits.push(...this._handleEmitsByIdentifier(inputNode));
        }
        return emits;
    }

    private _handleSetupMethod(componentOptionItem: MethodDeclaration): MethodComment[] {
        const body = componentOptionItem.body;
        const methods: MethodComment[] = [];
        if (body) {
            const bodyStatements = body.statements;
            const returnStatement = bodyStatements[bodyStatements.length - 1];
            if (body && ts.isReturnStatement(returnStatement)) {
                if (returnStatement.expression) {
                    methods.push(...this._findEndReturn(returnStatement.expression, componentOptionItem));
                }
            }
        }

        return methods;
    }

    private _findEndReturn(inputNode: Node, scope: Node): Array<MethodComment> {
        const comments = new Array<MethodComment>();
        if (ts.isCallExpression(inputNode)) {
            const methodName = inputNode.expression.getText();
            const structure = this.getStructureByNode(inputNode.expression);
            if (structure) {
                const scriptNode = this.getNodeByName(methodName, structure);
                const targetNode = scriptNode?.projection || scriptNode?.root;
                if (targetNode) {
                    comments.push(...this._findEndReturn(targetNode, scriptNode.root));
                    this._searchNodes.push(targetNode);
                }
            }
        } else if (ts.isArrowFunction(inputNode) || ts.isFunctionDeclaration(inputNode)) {
            if (inputNode.body) {
                comments.push(...this._findEndReturn(inputNode.body, scope));
            }
        } else if (ts.isBlock(inputNode)) {
            let returnStatement: ReturnStatement | undefined;
            inputNode.statements.forEach((statement) => {
                if (ts.isReturnStatement(statement)) {
                    returnStatement = statement;
                }
            });
            if (returnStatement && returnStatement.expression) {
                comments.push(...this._findEndReturn(returnStatement.expression, scope));
            }
        } else if (ts.isObjectLiteralExpression(inputNode)) {
            inputNode.properties.forEach((property) => {
                if (ts.isSpreadAssignment(property)) {
                    const targetNode = NodeUtils.getScopeDeclarations(property.expression.getText(), scope, this.context);
                    if (targetNode) {
                        comments.push(...this._findEndReturn(targetNode.projection || targetNode.root, scope));
                        this._handleReplaceType(property, comments);
                    } else {
                        const structure = this.getStructureByNode(property);
                        if (structure) {
                            const scriptNode = this.getNodeByName(property.expression.getText(), structure);
                            const targetNode = scriptNode?.projection || scriptNode?.root;
                            if (targetNode) {
                                comments.push(...this._findEndReturn(targetNode, scriptNode.root));
                                this._handleReplaceType(property, comments);
                            }
                        }
                    }
                } else {
                    const comment = this._methodPaser.parse(property, scope);
                    if (comment) {
                        comments.push(comment);
                    }
                }
            });
        }
        return comments;
    }

    private _handleSlots(): SlotComment[] {
        const slots: Array<SlotComment> = [];
        if (this.structure instanceof SfcStructure) {
            const slotNodes = this.structure.slotNodes;
            slotNodes.forEach((slotNode) => {
                const jsdocs = JsdocUtils.packgeTypeDef(this.structure.filename, slotNode.comments);
                const jsdoc = jsdocs[0];
                const paramTags = JsdocUtils.getParamTags(jsdoc);
                const comment = new SlotComment();
                comment.description = slotNode.comments[0]?.trim();
                const properties: PropertyComment[] = [];
                if (slotNode instanceof TemplateSlotNode) {
                    const nameAttr = slotNode.root.props.find((p) => 6 === p.type && p.name === 'name');
                    comment.name = nameAttr ? (<AttributeNode>nameAttr).value?.content : 'default';
                    slotNode.root.props
                        .filter((p) => (7 === p.type && p.name === 'bind' && 4 === p.arg?.type && !SpecialAttr.includes(p.arg.content)) || (6 === p.type && p.name !== 'name'))
                        .forEach((_arg) => {
                            const arg = _arg;
                            let name;
                            if (arg.type === 6) {
                                name = (<AttributeNode>_arg).name;
                            } else if (arg.type === 7) {
                                name = (<SimpleExpressionNode>(<DirectiveNode>_arg).arg).content;
                            }
                            const argComment = new PropertyComment();
                            argComment.name = camelCase(name);
                            const paramTag = name ? paramTags.get(name) : undefined;
                            if (paramTag) {
                                if (paramTag.typeExpression) {
                                    argComment.type = this._typePaser.parse(paramTag.typeExpression.type);
                                }
                                argComment.description = JsdocUtils.getDescription(paramTag);
                            }
                            properties.push(argComment);
                        });
                }
                comment.args = properties;
                slots.push(comment);
            });
        }
        return slots;
    }

    private _handleEvents(emits: Array<EventComment>): EventComment[] {
        const events: Array<EventComment> = [];

        this._searchNodes.forEach((_node) => {
            tsquery(
                _node,
                'ExpressionStatement:has([expression.expression.name=emit]),ExpressionStatement:has(CallExpression[expression.name.name=$emit]),ExpressionStatement:has([name=emit]),ExpressionStatement:has([name=$emit])',
                {
                    visitAllChildren: true
                }
            ).forEach((_n) => {
                events.push(this._eventPaser.parse(_n));
            });
        });

        if (emits) {
            emits.forEach((emit) => {
                const comment = events.find((event) => emit.name === event.name);
                if (comment) {
                    if (!emit.description) emit.description = comment.description;
                    if (!emit.args) emit.args = comment.args;
                }
            });
            return emits;
        } else {
            return events;
        }
    }
    private _handleMthods(inputNode: Node): Array<MethodComment> {
        const methods: Array<MethodComment> = [];
        if (ts.isObjectLiteralExpression(inputNode)) {
            inputNode.properties.forEach((property) => {
                if (ts.isSpreadAssignment(property)) {
                    const targetNode = this.context.getNodeByName(property.expression.getText(), this.structure);
                    const _node = targetNode?.projection || targetNode?.root;
                    if (_node) {
                        methods.push(...this._handleMthods(_node));
                        this._handleReplaceType(property, methods);
                    }
                } else {
                    this._searchNodes.push(property);
                    const comment = this._methodPaser.parse(property);
                    if (comment) {
                        methods.push(comment);
                    }
                }
            });
        }
        return methods;
    }

    private _handleProps(inputNode: Node): Array<PropComment> {
        const props: Array<PropComment> = [];
        if (ts.isObjectLiteralExpression(inputNode)) {
            inputNode.properties.forEach((property) => {
                if (ts.isSpreadAssignment(property)) {
                    //property.expression 为引用标识继续由 this._handleProps 处理
                    props.push(...this._handleProps(property.expression));
                } else {
                    props.push(this._propPaser.parse(property));
                }
            });
        } else if (ts.isArrayLiteralExpression(inputNode)) {
            inputNode.elements.forEach((element) => {
                props.push(this._propPaser.parse(element));
            });
        } else if (ts.isAsExpression(inputNode)) {
            props.push(...this._handleProps(inputNode.expression));
        } else if (ts.isIdentifier(inputNode)) {
            //处理定义引用标识
            props.push(...this._handlePropsByIdentifier(inputNode));
        }
        return reverse(uniqBy(reverse(props), 'name'));
    }

    /**
     * 处理定义引用标识
     * 比如 props:PropsDefine 或者 props 中有 ...操作符
     * props :{
     * 	... PropsDefine
     * }
     * @param identifier 标识
     * @returns
     */
    private _handlePropsByIdentifier(identifier: Identifier) {
        const props: Array<PropComment> = [];
        const structure = this.getStructureByNode(identifier);
        if (structure) {
            const targetNode = this.getNodeByName(identifier.text, structure);
            const _node = targetNode?.projection || targetNode?.root;
            if (_node) {
                props.push(...this._handleProps(_node));
            }
        }
        return props;
    }
    private _handleEmitsByIdentifier(identifier: Identifier) {
        const props: Array<EventComment> = [];
        const structure = this.getStructureByNode(identifier);
        if (structure) {
            const targetNode = this.getNodeByName(identifier.text, structure);
            const _node = targetNode?.projection || targetNode?.root;
            if (_node) {
                props.push(...this._handleEmits(_node));
            }
        }
        return props;
    }

    private _handleReplaceType(node: Node, comments: Array<EventComment | MethodComment | SlotComment>) {
        const replaces: Array<{ oldName: string; newType: TypeComment }> = [];

        const jsdocs = JsdocUtils.getJsDoc(node);
        const jsdoc = jsdocs[0];
        if (jsdoc) {
            const replaceTags = JsdocUtils.getTags('replaceType', jsdoc);
            if (replaceTags && replaceTags.length > 0) {
                replaceTags.forEach((tag) => {
                    if (isString(tag.comment)) {
                        const identifiers = tag.comment.split(' ');

                        const oldIdentifier = identifiers[0];
                        const newIdentifier = identifiers[1];

                        if (oldIdentifier && newIdentifier) {
                            const newNode = this.getNodeByNameAndStructure(newIdentifier, node);
                            if (newNode) {
                                replaces.push({
                                    oldName: oldIdentifier,
                                    newType: this._typePaser.parse(newNode)
                                });
                            } else {
                                console.error('未找到目标类型:' + newIdentifier);
                            }
                        } else {
                            console.error('类型替换参数不全：@replace oldTypeName newTypeName');
                        }
                    }
                });
            }
        }
        if (replaces.length > 0) {
            comments.forEach((comment) => {
                let _comments;
                if (Utils.isSlotComment(comment) || Utils.isEventComment(comment)) {
                    _comments = comment.args;
                } else if (Utils.isMethodComment(comment)) {
                    _comments = comment.parameters;
                }

                _comments?.forEach((_comment) => {
                    const replace = replaces.find((replace) => _comment.type?.name === replace.oldName);
                    _comment.type = replace?.newType;
                });
            });
        }
    }
}
