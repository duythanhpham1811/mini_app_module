import { MiniApp } from "./modules/mini_app";
import { IModule } from "./utils/type";

export async function init(data: IModule) {
  return new MiniApp();
}
