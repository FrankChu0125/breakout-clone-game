/** 遊戲內隨機生成的阻礙物 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class Hinder extends cc.Component {

    @property({ type: cc.Label, tooltip: "剩下次數" })
    hinderLabel: cc.Label = null

    onLoad() {
        // 旋轉
        // this.node.rotation = Math.random() * 180
        this.hinderLabel.node.rotation = -this.node.rotation
        let random = Math.floor(1 + Math.random() * 5)
        this.hinderLabel.string = '' + random
    }

    // 剛體碰撞function
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        // 障礙物與球碰撞
        if (otherCollider.tag == 0) {
            // 撞到後-1
            this.hinderLabel.string = String(Number(this.hinderLabel.string) - 1)
            if (this.hinderLabel.string < String(1)) {
                let gamecount = cc.director.getScene().getChildByName('count').getComponent(cc.Label);
                gamecount.string = String(Number(gamecount.string) + Math.floor(Math.random() * 6));
                this.node.destroy();
            }
        }
    }
}