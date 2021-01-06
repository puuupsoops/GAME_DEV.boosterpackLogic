//Класс описывающий коллекции (массив Item)
import { rpgItem, Item } from './Items';

export namespace rpgCollection{

    //Базовый класс для коллекции предметов
    export abstract class ICollection{
        
        protected _collection: Array<Item> = [];

        public get List(): Array<Item> {return this._collection};
        
        //Удалить предмет из коллекции
        public RemoveItem(item: Item){/*<--------!прописать_логику!-------->*/}

        //Показать коллекцию в консоле
        protected abstract DebugInfo(): void;
        
        //Добавить предмет в коллекцию
        protected abstract AddItem(item: Item): void;

        //Метод для графического отображения елементов (содержимое будет зависить от используемого движка или фреймворка)
        protected abstract Show(): void;    
    }

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ КЛАССЫ (ВИДЫ) КОЛЛЕКЦИИ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ \\

    //Коллекция, тип предметов: Item.IItem
    export class Collection extends ICollection{

        //Добавить единицу предмета в инвентарь.
        public AddItem(item: Item){
            this._collection.push(item);
        }

        //Метод для графического отображения елементов (содержимое будет зависить от используемого движка или фреймворка)
        public Show(): void{    };

        //Показать коллекцию в консоле
        public DebugInfo(): void {
           console.log('Collection DebugInfo:');

           this._collection.forEach(item => {
               console.log(item.DebugInfo());    
           });
       }

        //Перемешать элементы массива
        public Shuffle(){
            console.log('Shuffle element collection')
            let tmp;

            for(let i = this._collection.length - 1; i  > 0;){    
                let rnd = Math.floor((Math.random() * 10) % this._collection.length)

                if(rnd < this._collection.length && rnd >= 0){
                    tmp = Object.assign(this._collection[i])
                    this._collection[i] = Object.assign(this._collection[rnd])
                    this._collection[rnd] = Object.assign(tmp)
                    --i;
                }
            }
        }
    }

    //Инвентарь, тип предметов: Item.IItem 
    export class Inventory extends ICollection{

        //Добавить единицу предмета в инвентарь.
        public AddItem(item: Item){
            this._collection.push(Object.assign(item));
        }

        //Добавить коллекцию предметов в инвентарь.
        public addCollection(collection: Collection){
            for(let i = 0; i < collection.List.length; ++i)
                    this._collection.push(Object.assign(collection.List[i]));
        }

        //Метод для графического отображения елементов (содержимое будет зависить от используемого движка или фреймворка)
        public Show(): void{    };

        //Показать содержимое инвентаря в консоле
        public DebugInfo(): void {
            console.log('----------------------------------------------:Inventory DebugInfo');
            if(this._collection.length == 0){
                console.log('Empty!');
            }else
            {
                this._collection.forEach(item => {
                        console.log(item.DebugInfo());    
                });
            }
       }
    }
}