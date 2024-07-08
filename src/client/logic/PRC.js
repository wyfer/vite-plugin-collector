import { createRPCClient } from 'vite-dev-rpc';
import { createHotContext } from 'vite-hot-client';
import { useServerStore } from "@/stores/server.js";

const { setServerUrl } = useServerStore();

const hotIns = async () => {
  return await createHotContext('/___', `${location.pathname.split('/__collect__')[0] || ''}/`.replace(/\/\//g, '/'));
}

const rpc =
  (hotIns) => {
    return createRPCClient(
      'vite-plugin-collect',
      hotIns,
      {
        sendHttpServerPath(path) {
          setServerUrl(path);
        }
        // moduleUpdated(data) {
        //   console.log(data);
        //   console.log('00000000000');
        // },
        // getFiles(data) {
        //   console.log('12121');
        // },
        // getPackage() { }
      },
    )
  }

const rpcIns = async () => {
  const rpcIns = await hotIns();
  return rpc(rpcIns);
}


export default rpcIns;