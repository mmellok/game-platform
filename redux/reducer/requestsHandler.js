import Builder from "../../utils/redux/builder";

const builder = new Builder({
  name: "requestsHandler",
  initialState: {},
  reducers: {
  }
}).addMatcher(
  ({type}) => type.startsWith("requests/"),
  (state, {meta, payload, type}) => {
    if (!meta) return;
    const {requestStatus} = meta;
    state[type] = {status: requestStatus, data: payload, meta};
  }
);

export const requestsHandler = builder.create().export();
export const {useRequestsHandler} = requestsHandler.selectors;
export default requestsHandler;
