import Capitalise from "./capitalise";

const TagColours = (tag: string) => {
  switch (Capitalise(tag)) {
    case "Processing":
      return "geekblue";
    case "Available":
      return "green";
    case "Public":
      return "green";
    case "Internal":
      return "cyan";
    default:
      return "volcano";
  }
};

export default TagColours;
