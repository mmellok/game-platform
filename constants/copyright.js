import {baseUrl, image} from "../utils/data/baseUrl";


export const authContent = {
  auth: {
    title: "Log in",
    list: [
      {
        type: "input",
        props: {
          placeholder: "Name"
        }
      },
      {
        type: "input",
        props: {
          placeholder: "Password"
        }
      },
      {
        type: "button",
        props: {
          type: "button",
          action: {
            type: "setState",
            state: "main"
          },
          text: "Log in"
        }
      }
    ]
  },
  reg: {
    title: "Sign in",
    list: [
      {
        type: "input",
        props: {
          placeholder: "name"
        }
      },
      {
        type: "input",
        props: {
          placeholder: "password"
        }
      },
      {
        type: "button",
        props: {
          action: {
            type: "setState",
            state: "main"
          },
          text: "Sign in"
        }
      }
    ]
  }
};


export const introContent = {
  img: image("img.png"),
  title: "Welcome!",
  loadNote: 'Loading...',
  doneNote: "Press button",
  button: {
    text: "Play",
    action: {
      type: "setState",
      state: "auth"
    }
  }
};


export const mainContent = {
  name: "Username",
  lifes: 3,
  footer: [
    {
      img: image("menu/rating.png"),
      mods: ["menu", "transparent"]
    },
    {
      img: image("menu/play.png"),
      mods: ["menu", "transparent"]
    },
    {
      img: image("menu/prizes.png"),
      mods: ["menu", "transparent"]
    }
  ]
};


export const ratingContent = {

};

