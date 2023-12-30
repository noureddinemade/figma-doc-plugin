export class Component {

    constructor (

        public name:            string,
        public id:              any,
        public documentation:   any | null,
        public properties:      any | null,
        public styles:          any | null,
        public dependencies:    any | null,
        public instances:       any | null
        
    ) {}

}

export class Property {

    constructor (

        public name:            string,
        public type:            string,
        public defaultValue:    string,
        public options:         any | null,

    ) {}

}

export class Child {

    constructor (

        public name:            string,
        public id:              string,
        public parentID:        string,
        public level:           number,
        public style:           any | null

    ) {}

}

export class Item {

    constructor (

        public value:       any,
        public token:       any,
        public text:        any,
        public effect:      any,
        public name:        any,
        public category:    any
    
    ) {}

}

export class Stroke {

    constructor (

        public align: any,
        public weight: any,
        public fill: any,
        public dash: any

    ) {}

}

export class DropShadow {

    constructor (

        public fill: any,
        public offset: any,
        public radius: any,
        public spread: any,
        public opacity: any

    ) {}

}

// Classes to create documentation
export class Text {

    constructor (

        public textCase: any,
        public decoration: any,
        public font: any,
        public size: any,
        public weight: any,
        public style: any

    ) {}
    
}

export class Layout {

    constructor (
        
        public size: any,
        public padding: any,
        public gap: any,
        public radius: any
        
    ) {}

}

export class Visual {

    constructor (

        public fill: any,
        public stroke: any,
        public style: any,
        public layout: any
        
    ) {}

}

export class Frame {

    constructor (
        public direction: any,
        public gap: any,
        public padding: any,
        public radius: any,
        public style: any,
        public align: any,
        public size: any

    ) {}

}
