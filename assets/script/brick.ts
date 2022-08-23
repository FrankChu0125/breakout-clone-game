const { ccclass, property } = cc._decorator;

@ccclass
export default class Brick extends cc.Component {

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {

        // 碰到磚塊後 count數+1 銷毀該節點
        if (otherCollider.tag == 0) {
            let gamecc = cc.director.getScene().getChildByName('count').getComponent(cc.Label);
            gamecc.string = String(Number(gamecc.string) + 1);
            this.node.destroy();

        }

    }
}
