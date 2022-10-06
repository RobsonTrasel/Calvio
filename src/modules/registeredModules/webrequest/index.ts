import ModulesWrapper from "../../registerModule";
import Ping from "../../Ping";

const modulesWrapper = new ModulesWrapper();

modulesWrapper.registerModule("ping", new Ping());

export default modulesWrapper