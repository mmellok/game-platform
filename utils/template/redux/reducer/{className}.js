import Builder from "../../utils/redux/builder";

/**
 * slice name
 * @type {string}
 */

const builder = new Builder({
  name: "<%-class_name%>",
  initialState: {},
  reducers: {},
})
  // .createExtraReducer({})

builder.create();

const <%-className%> = builder.export();

export default <%-className%>;

// export const {} = content.thunks;
// export const {} = content.actions;
export const {use<%-ClassName%>} = <%-className%>.selectors;
