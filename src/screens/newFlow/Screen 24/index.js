import { useEffect } from "react";
// import { Digio, DigioConfig, GatewayEvent } from "@digiotech/react-native";
import { Text } from "react-native";
import { Environment } from "@digiotech/react-native/src";

const DigioComponent = () => {
  const config = { environment: Environment.SANDBOX };
  // const digio = new Digio(config);
  // useEffect(() => {
  //   const gatewayEventListener = digio.addGatewayEventListener((event) => {
  //     // Do some operation on the received events
  //     console.log("the value of the page load from digio ====>", event);
  //   });

  //   triggerDigioGateway();

  //   return () => {
  //     gatewayEventListener.remove();
  //   };
  // }, []);

  // const triggerDigioGateway = async () => {
  //   const documentId = "ACK2409051235120378DTMBOVCSCMOYI";
  //   const identifier = "umesh@vgibrokers.com";
  //   const tokenId = "X3JHO119CXRAK572RQGMSHE3ZTPXK7W8";

  //   const digioResponse = await digio.start(documentId, identifier, tokenId);
  //   return digioResponse;
  // };

  return <Text>dskdjs</Text>;
};

export default DigioComponent;
