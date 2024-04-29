import React from 'react';
import {
  faMoneyCheckAlt,
  faHandHoldingUsd,
  faMoneyBillWave,
  faFunnelDollar,
  faCoins,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { Heading } from "@chakra-ui/react";
import CheckListItem from './CheckListItem'
import CustomTableComponent from "../comparisonScreen/CustomTableComponent";

export default function Home() {
  return (
    <>
      <section className="container mx-auto px-6 p-10">
        <div className=" text-center text-palette-green-med mb-8 mt-12">
          <Heading as="h2" id="projects-section" color={"#ffff"} padding={5}>
            What should you look for in a stock?
          </Heading>
          <p className="text-2xl">Let's make this simple. You are the company. What would make you financially successful?</p>
        </div>

        <div className="main-content flex-1 bg-palette-light pb-24 md:pb-5">
          <div className="flex flex-row flex-wrap flex-grow mt-2 mx-4">
            <CheckListItem
              title="Which company occupies more market chunk?"
              subtitle="Market Capitalisation"
              icon={faMoneyCheckAlt}
              content="Market capitalisation indicates the amount of money earned by that company. Higher the market capitalisation, bigger the company."
            />
            <CheckListItem
              title="What is Sales over 5 years?"
              subtitle="Sales Over 5 Years"
              icon={faHandHoldingUsd}
              content="Sales over 5 years depicts the growith achieved by the company over period of 5 years. More sales, indicates more profitable company."
            />
            <CheckListItem
              title="Do you have spending money?"
              subtitle="Free Cash Flow"
              icon={faMoneyBillWave}
              content="Free cash flow indicates money spent by company on stuff other than daily expenses and operational/capital expenditure. Free cash flow must be positive."
            />
            <CheckListItem
              title="Do you owe too much?"
              subtitle="Debt to Equity(D/E)"
              icon={faCoins}
              content="D/E indicates the amount of debt taken by company against its equity. Lesser D/E depits lesser liabilities on company."
            />
            <CheckListItem
              title="How much you gain?"
              subtitle="Return On Equity"
              icon={faCreditCard}
              content="Return on equity is the ratio of your profits agains money you have invested. More ROE indicates more profits earned by that company."
            />
            <CheckListItem
              title="How much are you earning after tax?"
              subtitle="Earning Per Share"
              icon={faFunnelDollar}
              content="It is ratio of profit after tax(PAT) to total number of shares. More EPS indicates more profitable company. "
            />
          </div>
          <CustomTableComponent />
        </div>
      </section>
    </>
  )
}
