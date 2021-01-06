//Класс определяющий сущность 'Предмет'
export type Item = rpgItem.IItem;

export namespace rpgItem{

    //Тип предмета: ОРУЖИЕ, ШЛЕМ, ДОСПЕХ, ЩИТ
    export enum Type { BOOSTERPACK = 0, WEAPON = 1, HELMET , ARMOR , SHIELD };

    //Редкость предмета: ОБЫЧНЫЙ, НЕОБЫЧНЫЙ, РЕДКИЙ, ЛЕГЕНДАРНЫЙ
    export enum Rarity {COMMON = 2, UNCOMMON, RARE, LEGENDARY}; // 2 ... 5 звёзд.
    
    //Базовый класс для предметов
    export abstract class IItem {

        constructor(name: string, type: Type, rarity: Rarity = Rarity.COMMON){
            this._name = name;
            this._type = type;
            this._rarity = rarity;
        }
        
       protected _name: string = 'emptyItem';
       protected readonly _rarity?: Rarity;
       protected readonly _type: Type;
       
       public set Name(name: string) { this._name = name; };
       
       public get Name(): string { return this._name; };
       public get Rarity(): Rarity { return this._rarity};
       public get Type(): Type { return this._type};
        
       //Получить string с описанием значений всех существующих полей класса.
       public DebugInfo(): string {
           return "[TypeItem: " + Type[this._type] + "] " + " (name)"+this._name  + " -RarityItem(" + Rarity[this._rarity] + ")";
       }
    }

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ КЛАССЫ ПРЕДМЕТОВ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ \\
    //Оружие
    export class Weapon extends IItem {
        constructor(name: string, rarity?: Rarity){
            super(name,Type.WEAPON,rarity);
        }
    }

    //Шлем
    export class Helmet extends IItem {
        constructor(name: string, rarity?: Rarity){
            super(name,Type.HELMET,rarity);
        }
    }

    //Доспех
    export class Armor extends IItem {
        constructor(name: string, rarity?: Rarity){
            super(name,Type.ARMOR,rarity);
        }
    }

    //Щит
    export class Shield extends IItem {
        constructor(name: string, rarity?: Rarity){
            super(name,Type.SHIELD,rarity);
        }
    }
}