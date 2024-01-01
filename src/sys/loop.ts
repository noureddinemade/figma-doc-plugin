// Import

import { cleanName, isArray, sortArray } from "./functions/general";
import { getAll } from "./getAll";
import { Component } from "./helpers/classes";

// Loop thru selected component/s
export function loop(selected: any, toDocument: any) {

    selected.forEach((e: { type: string; name: any; id: any; documentationLinks: any[]; description: any; children: any[]; componentPropertyDefinitions: any; }) => {

        // Check if the selected item is a component
        if (e.type === 'COMPONENT_SET') {

            // Set up component props
            const compName:         any = cleanName(e.name, null);
            const compID:           any = e.id;
            const compURL:          any = isArray(e.documentationLinks) ? e.documentationLinks[0].uri : null;
            const compDesc:         any = e.description ? e.description : null;
            const compDocs:         any = { description: compDesc, link: compURL };
            const compAnatomy:      any = [];
            const compInstances:    any = [];
            
            // Set up base
            const baseComp:         any = e.children.find((a: { type: string; }) => a.type === 'COMPONENT');
            const baseInstance:     any = baseComp ? baseComp.createInstance() : null;

            // Add base instance to compInstances
            compInstances.push(baseInstance);

            // Set up dynamics
            let compProps:              any | null = [];
            let compStyles:             any | null = { shared: { top: null, all: null }, unique: { top: null, all: null } };
            let compDependencies:       any | null = [];

            // Get everything
            getAll(e, baseComp, baseInstance, compDependencies, compInstances, compProps, compStyles, compAnatomy);

            // Sort component properties by type
            sortArray(compProps, 'type');

            // Create raw component object
            const rawComponent = new Component(compName, compID, compDocs, compProps, compStyles, compDependencies, compInstances, compAnatomy);
            
            toDocument.push(rawComponent);

            console.log('--------------');
            console.log('Finished prepping components for documentating:', toDocument);
            console.log('--------------');

        }

        else { console.log(e.name, ': Not a component') } // Skip if not any type of component

    });

}