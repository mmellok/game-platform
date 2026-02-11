import Builder from "../../utils/redux/builder";

const builder = new Builder({
  name: "application",
  initialState: {
     state: "intro"
  },
  reducers: {
    setState: (state, {payload}) => {
      state.state = payload
    }
  }
});


builder.create();

const application = builder.export();

export default application;

export const {useApplication} = application.selectors;
export const {setState} = application.actions
