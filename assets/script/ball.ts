const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    // 剛體物件上的方法: 碰撞上的回調
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {

        console.log('撞到哪一個', otherCollider.tag);
        if (otherCollider.tag == 1) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(900, 900);
        }
        //球和foot_line碰撞
        if (otherCollider.tag == 5) {
            cc.director.getPhysicsManager().enabled = false;
            //cc.find('Canvas').destroyAllChildren();
            this.unscheduleAllCallbacks();
            cc.director.loadScene('GameOver');

        }

    }
}
