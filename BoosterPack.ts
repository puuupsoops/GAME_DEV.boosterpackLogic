//Класс описывающий реализацию бустерпаков
import { rpgCollection } from './Collection';
import { rpgItem} from './Items';
export namespace BoosterPack{
    
    //Тип бустерпака
    export enum Type { Standart = 1, Consistent = 2, Fair = 3 }

    //Базовый класс для бустерпаков
    export abstract class IBoosterPack extends rpgItem.IItem {
        constructor(rarity: rpgItem.Rarity, collection: rpgCollection.Collection){

            if(rarity == rpgItem.Rarity.COMMON)
                rarity = rpgItem.Rarity.UNCOMMON;
            
            let name: string = "[" + rpgItem.Rarity[rarity] + "] BOOSTERPACK";
            super(name,rpgItem.Type.BOOSTERPACK,rarity);
            
            this._rarity = rarity;
            this._collection = collection;//<---содержит входящую коллекцию предметов.
        }
        
        protected readonly _rarity: rpgItem.Rarity;
        protected readonly _collection: rpgCollection.Collection;

        public abstract Open(): rpgCollection.Collection;
    }

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ КЛАССЫ ПРЕДМЕТОВ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ \\

    //Стандартный бустерпак: 5 любых предметов.
    export class BoosterPack extends IBoosterPack{
        
        Open(): rpgCollection.Collection{
            let list: rpgCollection.Collection = new rpgCollection.Collection();

                let tmp: number = 0;
                while(tmp < 2)
                {
                    let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                        if(this._collection.List[rnd].Rarity == this._rarity){
                            list.AddItem(this._collection.List[rnd]);
                            tmp++;
                        }
                }
                tmp = 0;
                while(tmp < 3)
                {
                    let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                        if(this._collection.List[rnd].Rarity == this._rarity - 1){
                            list.AddItem(this._collection.List[rnd]);
                            tmp++;
                        }
                }
                console.log('Бустерпак открыт' + list.List);
                
                list.Shuffle();

            return list;
        }
    }

    //Последовательный бустерпак: в наборе из 5-ти вещей, выпадет неболее двух одинаковых пар идентичного типа.
    export class ConsistentBoosterPack extends IBoosterPack{
        
        Open(): rpgCollection.Collection{
            let list: rpgCollection.Collection = new rpgCollection.Collection();
            let tmp = 0;
            let n = 1;

            while(tmp < 1)
            {
                let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                    if(this._collection.List[rnd].Rarity == this._rarity-1){
                        list.AddItem(this._collection.List[rnd]);
                        tmp++;
                    }
            }
            tmp = 0;
            while(tmp < 2)
            {
                let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                    if(this._collection.List[rnd].Rarity == this._rarity){
                        if(this._collection.List[rnd].Type != list.List[n-1].Type){
                        list.AddItem(this._collection.List[rnd]);
                        tmp++;
                        n++;
                        }
                    }
            }

            tmp = 0;
            while(tmp < 2)
            {
                let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                    if(this._collection.List[rnd].Rarity == this._rarity-1){
                        if(this._collection.List[rnd].Type != list.List[n-2].Type && this._collection.List[rnd].Type != list.List[n-1].Type){
                        list.AddItem(this._collection.List[rnd]);
                        tmp++;
                        n++;
                        }
                    }
            }

            console.log('Бустерпак открыт' + list.List);

            list.Shuffle();

            return list;
        }
        
    }

    //Справидливый бустерпак: гарантирует получение всех предметов редкости Х, при открытии не более 24 бустерпаков. 
    export class FairBoosterPack extends IBoosterPack{
        static uncommon_q: number = 0;
        static rare_q: number = 0;
        static legendary_q: number = 0;

        constructor(rarity: rpgItem.Rarity, collection: rpgCollection.Collection){
            super(rarity,collection);
            
            switch (rarity) {
                case 3:
                        FairBoosterPack.uncommon_q += 1;
                    break;
                case 4:
                        FairBoosterPack.rare_q += 1;
                    break;
                case 5:
                        FairBoosterPack.legendary_q += 1;
                    break;
                default:
                        FairBoosterPack.uncommon_q += 1;
                    break;
            }

            console.log('uncommon: ' + FairBoosterPack.uncommon_q);
            console.log('rare: ' + FairBoosterPack.rare_q);
            console.log('legendary: ' + FairBoosterPack.legendary_q);
        }

        Open(): rpgCollection.Collection{
            let list: rpgCollection.Collection = new rpgCollection.Collection();
            let tmp = 0;
            let n = 1;
            let x = 0; //<- для числа открытых бустер-паков
            let max = 24;

            switch (this._rarity) {
                case 3:
                    x = FairBoosterPack.uncommon_q;
                    break;
                case 4:
                    x = FairBoosterPack.rare_q;
                    break;
                case 5:
                    x = FairBoosterPack.legendary_q
                    break;
                default:
                    x = FairBoosterPack.uncommon_q;
                    break;
            }

            if(x == max){
                switch (this._rarity) {
                    case 3:
                            FairBoosterPack.uncommon_q = 1;
                            x = FairBoosterPack.uncommon_q;
                        break;
                    case 4:
                            FairBoosterPack.rare_q = 1;
                            x = FairBoosterPack.rare_q;
                        break;
                    case 5:
                            FairBoosterPack.legendary_q = 1;
                            x = FairBoosterPack.legendary_q
                        break;
                    default:
                            FairBoosterPack.uncommon_q = 1;
                            x = FairBoosterPack.uncommon_q;
                        break;
                }
            }
            
                let k = Math.round((1/(max-x)) * 1000);
                console.log(k);
                
                if(k <= 55)
                    list.AddItem(new rpgItem.Shield('uni_shield',this._rarity));
                if(k >= 56 && k <= 89)
                    list.AddItem(new rpgItem.Weapon('uni_weapon',this._rarity));
                if(k >= 90 && k <= 199)
                    list.AddItem(new rpgItem.Armor('uni_armor',this._rarity));
                if(k >= 200 && k < 1000 || k == 1000)
                    list.AddItem(new rpgItem.Helmet('uni_helmet',this._rarity));
            
            while(tmp < 1)
            {
                let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                    if(this._collection.List[rnd].Rarity == this._rarity){
                        if(this._collection.List[rnd].Type != list.List[n-1].Type){
                        list.AddItem(this._collection.List[rnd]);
                        tmp++;
                        n++;
                        }
                    }
            }

            tmp = 0;
            while(tmp < 3)
            {
                let rnd:number = Math.floor(Math.random() * 100) % this._collection.List.length;

                    if(this._collection.List[rnd].Rarity == this._rarity-1){
                        if(this._collection.List[rnd].Type != list.List[n-2].Type && this._collection.List[rnd].Type != list.List[n-1].Type){
                        list.AddItem(this._collection.List[rnd]);
                        tmp++;
                        n++;
                        }
                    }
            }

            console.log('Бустерпак открыт' + list.List);

            list.Shuffle();

            return list;
        }
    }
}