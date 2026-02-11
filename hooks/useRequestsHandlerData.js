import {useRequestsHandler} from "../redux/reducer/requestsHandler";
import {useEffect, useMemo} from "react";

/**
 * example
 *   useRequestsHandlerData([{
 *     request: "requests/application/start",
 *     fulfilled: () => {
 *
 *     },
 *     rejected: () => {
 *
 *     }
 *   }]);
 */

const statuses = ["pending", "fulfilled", "rejected"];

export const useRequestsHandlerData = requestConfigs => {
  const requestsHandler = useRequestsHandler();

  const requestHandleLogic = useMemo(() => ({
    pending: async (data, config) => {
      await config.pending?.(data);
    },
    fulfilled: async (data, config) => {
      await config.fulfilled?.(data);
      config.settled?.();
    },
    rejected: async (data, config) => {
      await config.rejected?.(data);
      config.settled?.();
    }
  }), []);

  useEffect(() => {
    requestConfigs.forEach(config => {

      statuses.forEach(status => {
        const request = requestsHandler[`${config.request}/${status}`];
        if (request)
          requestHandleLogic[request.status]?.({...request.data, meta: request.meta}, config);
      })


    });
  }, [requestsHandler, requestConfigs, requestHandleLogic]);
};
