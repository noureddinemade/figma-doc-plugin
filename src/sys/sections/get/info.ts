// Import

// Get name, id, description and link from component
export function getInfo(component: any) {

    let compName:   any = component.name;
        compName        = compName ? compName : null;
    let compId:     any = component.id;
        compId          = compId ? compId : null;
    let compDesc:   any = component.description;
        compDesc        = compDesc ? compDesc : null;
    let compLink:   any = component.documentationLinks[0].uri;
        compLink        = compLink ? compLink : null;

    //
    return { name: compName, id: compId, description: compDesc, link: compLink };

}