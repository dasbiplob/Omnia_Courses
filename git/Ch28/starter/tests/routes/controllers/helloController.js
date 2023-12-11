import { getHello } from "../../services/helloService.js";

const hello = ({ render }) => {
  render("index.eta", { hello: getHello() });
};

export { hello };
