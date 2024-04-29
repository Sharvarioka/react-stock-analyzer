import * as React from "react";
import { HStack, VStack, Heading } from "@chakra-ui/react";

/**
 * Illustrates the use of children prop and spread operator
 */
const FullScreenSection = ({ children, isDarkBackground, minHeight, ...boxProps }) => {
  return (
    <VStack
      backgroundColor={boxProps.backgroundColor}
      color={isDarkBackground ? "white" : "black"}
    >
      <HStack minHeight={minHeight ? minHeight : "180vh"}{...boxProps}>
        {children}
      </HStack>
    </VStack>
  );
};

export default FullScreenSection;
