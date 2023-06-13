import { Node } from 'typescript';
import { AbstractNode } from '../../common/AbstractNode';
import { Context } from '../../common/Context';
import { ScriptNode } from '../node/ScriptNode';
import { ScriptStructure } from '../node/ScriptStructure';
import { BasicComment } from './basic/BasicComment';
import { NodeComment } from './node/NodeComment';

export abstract class AbstractCommentParser<C extends BasicComment | NodeComment | undefined> {
    private _structure: ScriptStructure;
    private _context: Context;

    constructor(structure: ScriptStructure, context: Context) {
        this._structure = structure;
        this._context = context;
    }

    public get context(): Context {
        return this._context;
    }
    /**
     * Getter structure
     * @return {AbstractStructure}
     */
    public get structure(): ScriptStructure {
        return this._structure;
    }

    init() {}

    abstract parse(node: AbstractNode | Node, scope?: Node): C;

    /**
     * 从当前引入的脚本中查找定义
     * @param name 定义名称
     * @param structure 当前脚本结构
     * @returns 脚本节点
     */
    getNodeByName(name: string, structure: ScriptStructure): ScriptNode | undefined {
        return this.context.getNodeByName(name, structure);
    }

    getStructureByNode(node: Node) {
        return this.context.getStructure(node.getSourceFile().fileName);
    }

    getNodeByNameAndStructure(name: string, scope: Node) {
        const structure = this.getStructureByNode(scope);
        if (structure) {
            const targetNode = this.getNodeByName(name, structure);
            return targetNode?.projection || targetNode?.root;
        }
    }
}
