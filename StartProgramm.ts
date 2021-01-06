//Стартовый скрипт (точка входа) для CocosCreator
import {rpgItem}  from './Items';
import { rpgCollection } from './Collection';
import {BoosterPack} from './BoosterPack';
import {UICard} from './UICard';
import {UICollection} from './UICollection';
import { ItemSet32 } from './ItemSet32';

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartProgramm extends cc.Component {

    private itemList: rpgCollection.Collection;
    private _rarity: rpgItem.Rarity;
    private _inventory: rpgCollection.Inventory = new rpgCollection.Inventory();
    private _uiBossterPackBar: UICollection = new UICollection();

    setRarityUncommon(){ this._rarity = rpgItem.Rarity.UNCOMMON};
    setRarityRare(){ this._rarity = rpgItem.Rarity.RARE};
    setRarityLegendary(){ this._rarity = rpgItem.Rarity.LEGENDARY};

    public OpenStandartBoosterPack(rarity: rpgItem.Rarity = rpgItem.Rarity.COMMON){
      cc.loader.release('prefabs/BoosterCard');
      
      let tmp = new BoosterPack.BoosterPack(this._rarity,this.itemList).Open();
      tmp.DebugInfo();

      this._inventory.addCollection(tmp);

      this._uiBossterPackBar.Clear();
      this._uiBossterPackBar.Dysplay(tmp);
    }

    public OpenConsistentBoosterPack(rarity: rpgItem.Rarity = rpgItem.Rarity.COMMON){
      cc.loader.release('prefabs/BoosterCard');

      let tmp = new BoosterPack.ConsistentBoosterPack(this._rarity,this.itemList).Open();
      tmp.DebugInfo();

      this._inventory.addCollection(tmp);

      this._uiBossterPackBar.Clear();
      this._uiBossterPackBar.Dysplay(tmp);
    }

    public OpenFairBoosterPack(rarity: rpgItem.Rarity = rpgItem.Rarity.COMMON){
      cc.loader.release('prefabs/BoosterCard');

      let tmp = new BoosterPack.FairBoosterPack(this._rarity,this.itemList).Open();
      tmp.DebugInfo();

      this._inventory.addCollection(tmp);

      this._uiBossterPackBar.Clear();
      this._uiBossterPackBar.Dysplay(tmp);
    }

    public OpenInventory(){
      this._inventory.DebugInfo();
    }

    getBoosterPack(quantity: number, type: BoosterPack.Type){
      let boosterPack: BoosterPack.IBoosterPack;

      switch (type) {
        case BoosterPack.Type.Standart:
          boosterPack = new BoosterPack.BoosterPack(rpgItem.Rarity.COMMON,this.itemList);
          break;
        case BoosterPack.Type.Consistent:
          boosterPack = new BoosterPack.ConsistentBoosterPack(rpgItem.Rarity.COMMON,this.itemList);
          break;
        case BoosterPack.Type.Fair:
          boosterPack = new BoosterPack.FairBoosterPack(rpgItem.Rarity.COMMON,this.itemList);
            break;
        default:
          boosterPack = new BoosterPack.BoosterPack(rpgItem.Rarity.COMMON,this.itemList);
          break;
      }

      for(let i = 0; i < quantity; ++i){
          this._inventory.AddItem(Object.assign(boosterPack));
      }
    }

    onLoad () {
      this._rarity = rpgItem.Rarity.UNCOMMON;
      
       this.itemList = new ItemSet32().CreateItemSet();
       this.itemList.DebugInfo();
    }

    start () {  }

    onDestroy(){  }
}
