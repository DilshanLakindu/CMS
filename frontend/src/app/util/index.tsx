const css = (...arg: any) => {
    return arg.filter((t: string) => t !== undefined).join(" ");
  };

  export default css