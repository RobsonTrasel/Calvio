import ModulesWrapper from "../../ModulesRegister";
import Ping from "../../Ping";

const modulesWrapper =  new ModulesWrapper();

modulesWrapper.registerModule('ping', new Ping())

export default modulesWrapper