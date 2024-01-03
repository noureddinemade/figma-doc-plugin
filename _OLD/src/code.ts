// // Import classes
// import { isArray    } from "./sys/functions/general";
// import { showAll    } from "./sys/showAll";
// import { loop       } from "./sys/loop";

// // Set base constructs
// const cs:           any     = figma.currentPage.selection;
// const toDocument:   any[]   = [];

// // Check if a user has selected anything
// if (isArray(cs)) {

//     try {

//         await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Regular" });
//         await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Medium" });
//         await figma.loadFontAsync({ family: "Inter", style: "Regular" });
//         await figma.loadFontAsync({ family: "Inter", style: "Medium" });
//         await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

//         // Loop thru selected items and get properties, styles and anything else needed
//         loop(cs, toDocument);

//         // Loop thru toDocument array and document the component
//         // showAll(toDocument);

//     }

//     catch(error) { console.log('Error: ', error) }

//     finally {

//         // console.clear();
//         figma.closePlugin(`Wow, look at all that documentation!`);

//     }

// }

// else { console.clear(); figma.closePlugin('"If nothing is selected, how can anything be documented?" — An ancient design system proverb') }