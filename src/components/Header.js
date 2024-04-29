import React, { useEffect, useRef } from "react";
import { Box, HStack, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const headerRef = useRef(null);
  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      if (prevScrollPosition > currentScrollPosition) {
        headerElement.style.transform = "translateY(0px)";
      } else {
        headerElement.style.transform = "translateY(-200px)";
      }
      prevScrollPosition = currentScrollPosition;
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      ref={headerRef}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack>
              <FontAwesomeIcon icon={faArrowTrendUp} color='white' fontSize="50px" margin="10px" />
              <Heading as="h1" margin="10px">Stock Analyzer</Heading>
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a href="#all-stocks" onClick={handleClick("all-stocks")}>All Stocks</a>
              <a href="#stocks" onClick={handleClick("stocks")}>Your Stocks</a>
              <a href="#chart" onClick={handleClick("chart")}>Compare</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
