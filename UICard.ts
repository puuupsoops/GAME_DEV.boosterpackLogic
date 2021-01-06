//Класс описывающий графическое отображение сущности карты бустернабора, используется для визуализации в CocosCreator (опциональный)
import { rpgItem } from "../../Scripts/InventoryScriptsSystems/Items";

const {ccclass, property} = cc._decorator;

@ccclass
export class UICard extends cc.Component {
    private _self: cc.Node;

    private _posX: number;
    private _posY: number;

    private _width:number;
    private _height: number;

    public get PosX(){return this._posX};
    public get PosY(){return this._posY};

    public get Width(){return this._width};
    public get Height(){return this._height};

    // LIFE-CYCLE CALLBACKS:
    public Dysplay(item: rpgItem.IItem, posX: number = 0, posY: number = 0): this{

        cc.loader.loadRes('prefabs/BoosterCard',(err,prefab) => {
            this._self = cc.instantiate(prefab);
            this._self.parent = cc.director.getScene().getChildByName('Canvas');
            this._self.setPosition(cc.director.getScene().width/2 - this._self.width/2 - posX, cc.director.getScene().height/2 - this._self.height/2 - posY);

            this._posX = this._self.getPosition().x;
            this._posY = this._self.getPosition().y;

            this._width = this._self.width;
            this._height = this._self.height;

            this._self.getChildByName("labelName").getComponent(cc.Label).string = item.Name;
            this._self.getChildByName("labelRarity").getComponent(cc.Label).string = rpgItem.Rarity[item.Rarity];
            this._self.getChildByName("labelItemType").getComponent(cc.Label).string = rpgItem.Type[item.Type];

            switch (item.Rarity) {
                case 3:
                    cc.loader.loadRes('boosterpackImage/Uncommon', cc.SpriteFrame, (err,spriteFrame) => {
                        this._self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                    //this.node.getComponent(cc.Sprite).spriteFrame = this.spriteUncommon;
                    break;
                case 4:
                    cc.loader.loadRes('boosterpackImage/Rare', cc.SpriteFrame, (err,spriteFrame) => {
                        this._self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                    //this.node.getComponent(cc.Sprite).spriteFrame = this.spriteRare;
                        break;
                case 5:
                    cc.loader.loadRes('boosterpackImage/Legendary', cc.SpriteFrame, (err,spriteFrame) => {
                        this._self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                    //this.node.getComponent(cc.Sprite).spriteFrame = this.spriteLegendary;
                        break;
                default:
                    cc.loader.loadRes('boosterpackImage/Common', cc.SpriteFrame, (err,spriteFrame) => {
                        this._self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                    //this.node.getComponent(cc.Sprite).spriteFrame = this.spriteCommon;
                    break;
            }
            });
            return this
    }

    public Release(){
        this._self.destroy();
    }

    onLoad () {
        
    }

    start () {
        
    }

    // update (dt) {}

    onDestroy(){
        this._self.destroyAllChildren();
    }
}
