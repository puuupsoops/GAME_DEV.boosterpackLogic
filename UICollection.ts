//Класс описывающий графическое отображение сущносей карт бустернабора, в качестве коллекции, используется для визуализации в CocosCreator (опциональный)
import {rpgItem}  from './Items';
import { rpgCollection } from './Collection';
import {BoosterPack} from './BoosterPack';
import {UICard} from './UICard';

const {ccclass, property} = cc._decorator;

@ccclass
export class UICollection extends cc.Component {
    uiCollection: Array<UICard> = [];

    // LIFE-CYCLE CALLBACKS:
    public Dysplay(collection: rpgCollection.Collection){
       let x = 600;

        for(let i = 0; i < collection.List.length; ++i){
            this.uiCollection.push(new UICard().Dysplay(collection.List[i],x-=200));
        }

    }
    public Clear(){
        if(this.uiCollection.length == null)
            return;
        if(this.uiCollection.length == 0){
            return;
        }else{
        this.uiCollection.forEach(element => {
            element.Release();
        });
        }
    }
    onLoad () {}

    start () {

    }

    // update (dt) {}
}
