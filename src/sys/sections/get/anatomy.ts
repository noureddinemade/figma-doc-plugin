// Import
import { frame, shape, text } from "../../data/styles";
import { belongsToInstance, anyChildren, isInstance, findBaseComp } from "../../functions/component";
import { make, makeInstance } from "../../functions/create";
import { isArray } from "../../functions/general";

// Get the anatomy of the component
export function getAnatomy(props: any, children: any) {

    // Set up
    let compAnatomy: any = { instance: null, children: null };

    // Get all boolean props from component
    const booleanProps:     any     = props.filter((a: any) => a.type === 'BOOLEAN');
    const propsForInstance: any[]   = [];

    // Check if there are any booleans props
    if (isArray(booleanProps)) {

        // Loop thru props and turn them on for the instance
        booleanProps.forEach((b: any) => propsForInstance.push({[b.name]: b.value === true ? false : true }));

    }

    // Create an instance
    let instance: any   = makeInstance('anatomyInstance', propsForInstance, [{ label: 'forAnatomy', value: 'true' }]);
        instance        = instance ? instance : null;

    // Create instance diagram
    const diagram   = make('diagramKeys', frame.h.sm, 'frame');
    
    diagram.resize(instance.width, instance.height);
    diagram.clipsContent = false;

    // Get all instance and component children
    const baseChildren: any = anyChildren(findBaseComp());
    const instChildren: any = anyChildren(instance);

    // Check if there are any component children
    if (isArray(baseChildren)) {

        // Set up temp arrau
        const temp: any[] = [];

        // Loop thru children
        baseChildren.forEach((c: any) => {

            // Find out if this child or it's parent is an instance
            const childIsAnInstance         = isInstance(c);
            const childBelongsToInstance    = belongsToInstance(c);

            if (childIsAnInstance && !childBelongsToInstance)  { temp.push(c) };
            if (!childIsAnInstance && !childBelongsToInstance) { temp.push(c) };

        });

        // Match children in temp with instance children
        // Check if there are any temp children
        if (isArray(temp) && isArray(instChildren)) {

            // Set up
            compAnatomy.children = [];
            let count: number = 0;

            // Loop thru each child in temp
            temp.forEach((c: any, key: number) => {

                // Find matches
                const matches: any = instChildren.filter((a: any) => {

                    let fixedId = a.id.split(';');
                        fixedId = isArray(fixedId) ? fixedId[1] : fixedId;
                    
                    return fixedId === c.id;
                
                });

                // Check if anything matched
                if (isArray(matches)) { 
                    
                    // Add to array
                    compAnatomy.children.push(c);

                    // Create key
                    count = count + 1;
                    const keyFrame  = make('number', frame.key, 'frame');
                    const keyLabel  = make('label', text.label.key, 'text', String(count));
                    // const keyLine   = make('line', shape.key, 'line');

                    // Append
                    keyFrame.appendChild(keyLabel);
                    // diagram.appendChild(keyLine);
                    diagram.appendChild(keyFrame);

                    // Position & size
                    const match     = matches[0];
                    const matchX    = match.x + match.width / 2;
                    const matchY    = key % 2 === 0 ? match.y + 32 : match.y - 32;

                    keyFrame.layoutPositioning = 'ABSOLUTE';
                    keyFrame.x = matchX;
                    keyFrame.y = matchY;

                
                };

            });

            // Add diagram instance
            compAnatomy.instance    = instance;
            compAnatomy.diagram     = diagram;

        }

    }

    //
    return compAnatomy && isArray(compAnatomy.children) ? compAnatomy : null;

}