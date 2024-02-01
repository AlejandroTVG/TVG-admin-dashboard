import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import React from "react";
import Header from "./header";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <ThemedLayoutV2
        Header={Header}
        Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}>
        {children}
      </ThemedLayoutV2>
    </div>
  );
};

export default Layout;
