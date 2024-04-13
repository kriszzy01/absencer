import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FunctionComponent } from "react";

import { AppProvider } from "@/providers/app";

export const render = async (ui: any) => {
  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
    }),
  };

  return returnValue;
};

export * from "@testing-library/react";
export { userEvent, rtlRender };
