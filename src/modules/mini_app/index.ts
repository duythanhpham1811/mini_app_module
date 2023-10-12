import { EVENT_NAMES, platformName } from "../../utils/constant";
import { IData } from "../../utils/type";

const { ANDROID, IOS } = platformName;

interface Window {
  webkit?: any;
  AndroidAppProxy?: any;
  addEventListener?: any;
}

interface EventData {
  event_message: string;
  data: any;
}

declare var window: Window;

export class MiniApp {
  public authen: any;
  public os: string;
  public baseApiInstance: any;

  constructor() {
    this.test()
    this.sendReadyEventToMiniApp();
    this.getDataFromNative();
  }

  public test() {
    alert('123')
  }

  public sendReadyEventToMiniApp() {
    this.os = this.getOSName();
    // this.os = this.checkMobileOS();
    const data: IData = {
      event_message: EVENT_NAMES.ON_READY,
      data: {
        source: "from web",
      },
    };

    this.sendEventToNative(data);
  }

  public sendEventToNative(info: IData) {
    const dataToSendNative = JSON.stringify(info);

    switch (this.os) {
      case ANDROID:
        window.AndroidAppProxy.invokeNative(dataToSendNative);
        return;
      case IOS:
        window.webkit.messageHandlers.invokeNative.postMessage(
          dataToSendNative
        );
        return;
    }
  }

  public getOSName() {
    try {
      const user_agent = navigator.userAgent;
      if (user_agent.toLowerCase().includes("android")) {
        return ANDROID;
      }

      if (/iPad|iPhone|iPod/.test(user_agent)) {
        return IOS;
      }
    } catch (error) {
      console.log("[authen_sdk] Fail to get OS name: ", error);
    }
    return "unknown";
  }

  public getDataFromNative() {
    window.addEventListener("message", this.handleEventMessage, true);
  }

  public handleEventMessage = (event?: any) => {
    const { event_message = "", data = {} }: EventData = event.data;
    console.log(`event.data : ${event.data}`);

    switch (event_message?.toUpperCase()) {
      case EVENT_NAMES.AUTHENTICATION_DATA:
        console.log(`event_message : ${event_message}`);
        console.log(`authen tokens from native : ${data}`);
        this.authen.emit("mini-app-authen-success", data);
        return;
      default:
        return;
    }
  };
}
