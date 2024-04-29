import React from "react";
import FullScreenSection from "./FullScreenSection";
import Home from './home/Home'

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <Home />
  </FullScreenSection>
);

export default LandingSection;
