const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {
    @property(cc.Label)
    source: cc.Label = null;
    @property(cc.Node)
    again: cc.Node = null;
    @property(cc.Node)
    leave: cc.Node = null;
    getSource: cc.Label
    onLoad() {
        // let getSource = cc.director.getScene().getChildByName('count').getComponent(cc.Label)
        // getSource.node.active = false

        this.again.on(cc.Node.EventType.TOUCH_END, () => {
            // getSource.string = '0'
            cc.director.loadScene('Game')
        })

        this.leave.on(cc.Node.EventType.TOUCH_END, () => {
            cc.director.end()
        })
    }
}
