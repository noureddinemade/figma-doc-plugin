export class Item {

    constructor (

        public value: any,
        public token: any,
        public name: any
    
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

export class Size {

    constructor (

        public width: any,
        public minWidth: any,
        public maxWidth: any,
        public height: any,
        public minHeight: any,
        public maxHeight: any

    ) {}
}

export class Box {

    constructor (
        
        public top: any,
        public right: any,
        public bottom: any,
        public left: any

    ) {}

}

export class Property {

    constructor (
        
        public name: any,
        public type: any,
        public options: any
        
    ) {}

}

export class Child {

    constructor (

        public name: any,
        public id: any,
        public level: any,
        public properties: any,
        public parent: any,
        public type: any

    ) {}

}

export class Variant {

    constructor (

        public name: any,
        public options: any

    ) {}

}

export class Component {

    constructor (

        public name: any,
        public id: any,
        public properties: any,
        public variants: any,
        public docs: any,
        public link: any

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
        public token: any,
        public align: any,
        public size: any

    ) {}

}
