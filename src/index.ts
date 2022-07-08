
import RollupVue3TsTemplate from "./index.vue";

import { App, Plugin } from "vue";



const RollupVue3TsTemplateComponent = RollupVue3TsTemplate as typeof RollupVue3TsTemplate & Plugin

RollupVue3TsTemplateComponent.install = (app: App): void => {
    app.component(RollupVue3TsTemplateComponent.name, RollupVue3TsTemplateComponent);
}


export default RollupVue3TsTemplateComponent;
