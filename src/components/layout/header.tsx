import React from "react";
import CurrentUser from "./current-user";
import { Layout, Space } from "antd";

const Header = () => {
  const headerStyles: React.CSSProperties = {
    background: "#fff",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 20px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  return (
    <div>
      <Layout.Header style={headerStyles}>
        <Space>
          <CurrentUser />
        </Space>
      </Layout.Header>
    </div>
  );
};

export default Header;
