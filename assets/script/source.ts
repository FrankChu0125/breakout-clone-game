const { ccclass, property } = cc._decorator;

@ccclass
export default class Source extends cc.Component {

    // 把分數設成常駐節點 讓他可以被其他場景使用
    onLoad() {
        cc.game.addPersistRootNode(this.node)
    }
}
