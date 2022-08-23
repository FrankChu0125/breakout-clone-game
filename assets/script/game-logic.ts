const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {

    @property({ type: cc.Node, tooltip: "球體" })
    ball: cc.Node = null

    @property({ type: cc.Node, tooltip: "控制平台" })
    ctrlBar: cc.Node = null

    @property({ type: cc.Prefab, tooltip: "磚塊" })
    brick: cc.Prefab = null

    @property({ type: cc.Prefab, tooltip: "阻礙" })
    hinder: cc.Prefab = null

    @property({ type: cc.Label, tooltip: "得分" })
    count: cc.Label = null

    @property({ type: cc.Integer, tooltip: "磚塊的X" })
    brickX: number = -280

    @property({ type: cc.Integer, tooltip: "磚塊的Y" })
    brickY: number = 400

    @property({ type: cc.Integer, tooltip: "磚塊的寬" })
    brickWidth: number = 60

    @property({ type: cc.Integer, tooltip: "縱向間距" })
    brickPadding: number = 100

    onLoad() {
        let self = this;
        this.count.node.active = true;
        // 開啟碰撞
        cc.director.getPhysicsManager().enabled = true;
        /** 點擊控制桿 */
        self.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            // 將點擊後的座標轉為節點坐標系的座標
            let clickPos = self.node.convertToNodeSpaceAR(event.getLocation());
            this.ctrlBar.x = clickPos.x

            // 限制在螢幕範圍內
            let minx = -self.node.width / 2 + this.ctrlBar.width / 2;
            let maxx = -minx;
            if (this.ctrlBar.x > maxx) {
                this.ctrlBar.x = maxx;
            }
            if (this.ctrlBar.x < minx) {
                this.ctrlBar.x = minx;
            }
        }, self)

        //自动生成砖块
        self.schedule(function () {
            self.createbrick();

        }, 0.2, 1);
        //生成障碍物
        self.schedule(function () {
            self.createRinder();
        }, 10, 2);
    }

    /** 產生磚塊 */
    private createbrick(): void {
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 10; j++) {
                let newPrefab = cc.instantiate(this.brick);
                this.node.addChild(newPrefab);
                let brick_x = this.brickX + (j - 1) * this.brickWidth;
                let brick_y = this.brickY;
                newPrefab.setPosition(cc.v2(brick_x, brick_y));
            }
            
            this.brickY -= this.brickPadding;
        }
    }

    /** 生產障礙物 */
    createRinder() {
        let newHinder = cc.instantiate(this.hinder);
        this.node.addChild(newHinder);
        newHinder.rotation = Math.random() * 90;

        let barmin = -this.node.width / 2 + newHinder.width / 2;//最小坐标
        let barmax = -barmin;
        let bar_x = Math.random() * (barmax - barmin + 1) + barmin;
        newHinder.setPosition(cc.v2(bar_x, -50));
        if (newHinder.x > barmax) {
            newHinder.x = barmax;
        }
        if (newHinder.x < barmin) {
            newHinder.x = barmin;
        }
    }

}
