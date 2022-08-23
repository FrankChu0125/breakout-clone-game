const { ccclass, property } = cc._decorator;

@ccclass
export default class CtrlBar extends cc.Component {

    onLoad() {
        // 縮放的連續動作
        const beg = cc.scaleTo(0.9, 0.7)
        const ben = cc.scaleTo(0.9, 1)
        this.node.runAction(cc.repeatForever(cc.sequence(beg, ben)))
    }

}
