    //Генерирует тестовый набор в виде rpgCollection.Collection из 32 предметов.
import {rpgItem}  from './Items';
import { rpgCollection } from './Collection';

export class ItemSet32{

    CreateItemSet(): rpgCollection.Collection{
        let collection: rpgCollection.Collection = new rpgCollection.Collection();

        let names: string[] = ["type1","type2"];
        let countCreation: number = 0; //as rarity item

        for(countCreation; countCreation<4;countCreation++){
            for(let i:number = 0; i < 2; ++i){
                collection.AddItem(new rpgItem.Armor(names[i],countCreation+2));
            }
            for(let i:number = 0; i < 2; ++i){
                collection.AddItem(new rpgItem.Helmet(names[i],countCreation+2));
            }
            for(let i:number = 0; i < 2; ++i){
                collection.AddItem(new rpgItem.Shield(names[i],countCreation+2));
            }
            for(let i:number = 0; i < 2; ++i){
                collection.AddItem(new rpgItem.Weapon(names[i],countCreation+2));
            }
        }
        return collection;
    }
}