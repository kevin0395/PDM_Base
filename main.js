import * as OBC from 'openbim-components';
const container = document.createElement( 'div' );
container.id = "container";
document.body.appendChild( container );
const components = new OBC.Components();
components.scene = new OBC.SimpleScene(components);
components.renderer = new OBC.SimpleRenderer(components, container);
components.camera = new OBC.SimpleCamera(components);
components.raycaster = new OBC.SimpleRaycaster(components);
components.init();
const grid = new OBC.SimpleGrid(components);
components.scene.setup();
const scene = components.scene.get();
let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);
await fragmentIfcLoader.setup();
fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = false;
fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
async function loadIfcAsFragments() {
const file = await fetch("./model/IFC_TEST.ifc");
const data = await file.arrayBuffer();
const buffer = new Uint8Array(data);
const model = await fragmentIfcLoader.load(buffer, "example");
scene.add(model);
}
loadIfcAsFragments();