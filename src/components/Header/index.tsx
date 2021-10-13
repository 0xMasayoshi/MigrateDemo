import React from "react";
import { Box, Button } from "@material-ui/core/";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../../constants/connectors";

export function Header() {
  const { active, activate, deactivate, account } = useWeb3React();

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      style={{ padding: 20 }}
    >
      {active ? (
        <Button
          variant={"outlined"}
          onClick={() => deactivate()}
          style={{ maxWidth: "100px" }}
        >
          <Box overflow="hidden" textOverflow="ellipsis">
            {account}
          </Box>
        </Button>
      ) : (
        <Button
          variant={"outlined"}
          onClick={() => activate(injectedConnector)}
        >
          Connect
        </Button>
      )}
    </Box>
  );
}
