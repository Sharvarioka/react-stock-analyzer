import axios from 'axios';
import { useTable, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import FullScreenSection from "../FullScreenSection";
import LineChart from '../LineChart';
import {
  Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
} from "@chakra-ui/react";
import "./tablestyles.css";

import { useEffect, useMemo, useState } from "react";

export default function CustomTableComponent() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [cellFavorite, setCellFavorite] = useState({});
  const [favData, setFavData] = useState([]);

  const AddToFavorite = (row) => {
    const companyData = row.original;
    const updatedCompanyData = { "email": "sharvarioka1998@gmail.com", "stockName": companyData.companyAbbr }
    axios.patch('https://stockanalyzerdeploy.onrender.com/favoriteStocks',
      updatedCompanyData
    ).then((response) => {
      refreshFavData()
    }).catch((error) => {
      console.error('There was an error!', error);
    })
  };

  const FavoriteState = (row) => {
    if (cellFavorite[row.original.companyAbbr]) {
      axios.patch(`https://stockanalyzerdeploy.onrender.com/removeFavoriteStocks`, { stockName: row.original.companyAbbr, email: "sharvarioka1998@gmail.com" })
        .then(res => {
          const result = { ...cellFavorite, [row.original.companyAbbr]: false };
          setCellFavorite(result);
          refreshFavData();
        })
    } else {
      AddToFavorite(row);
      const result = { ...cellFavorite, [row.original.companyAbbr]: true };
      setCellFavorite(result);
    }

  }
  const columns = useMemo(
    () => [
      {
        Header: "Company",
        accessor: "companyAbbr"
      },
      {
        Header: "Stock Price",
        accessor: "todayStockPrice"
      },
      {
        id: 'favorite',
        accessor: '[row identifier to be passed to button]',
        Cell: ({ row }) => {
          return (
            <button onClick={() => FavoriteState(row)} >
              {cellFavorite[row.original.companyAbbr] ? (
                <FontAwesomeIcon icon={faHeart} size="1x" color='red' />
              ) : (
                <FontAwesomeIcon icon={faHeartBroken} size="1x" color='grey' />
              )}
            </button >
          )
        }
      }
    ],
    [cellFavorite]
  );

  const refreshFavData = () => {
    axios.get(`https://stockanalyzerdeploy.onrender.com/user`, { params: { email: "sharvarioka1998@gmail.com" } })
      .then(res => {
        const favCompanies = res.data.favoriteStocks;
        const favCompaniesData = allCompanies.filter((item) => favCompanies.includes(item.companyAbbr));
        setFavData(favCompaniesData);
      })
  }

  useEffect(() => {
    axios.get(`https://stockanalyzerdeploy.onrender.com/stockCompanies`)
      .then(res => {
        const resCompanies = res.data;
        setAllCompanies(resCompanies);
        axios.get(`https://stockanalyzerdeploy.onrender.com/user`, { params: { email: "sharvarioka1998@gmail.com" } })
          .then(res => {
            const favCompanies = res.data.favoriteStocks;
            const result = {};
            favCompanies.forEach(fav => result[fav] = true)
            const favCompaniesData = resCompanies.filter((item) => favCompanies.includes(item.companyAbbr));
            setCellFavorite(result);
            setFavData(favCompaniesData);
          })
      })
  }, []);

  const table = useTable({ columns, data: allCompanies }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  return (
    <>
      <div className="container">
        <Heading as="h1" id="all-stocks-section" backgroundColor="#14532d" color={"#ffff"} padding={5}>
          Mark Your Favorite Stocks
        </Heading>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "desc"
                          : "asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

      <div className="container" backgroundColor="#14532d" >
        <Heading as="h2" id="stocks-section" backgroundColor="#14532d" color={"#ffff"} padding={5}>
          Favorite stocks
        </Heading>


        <div className="main-content flex-1 bg-palette-light pb-24 md:pb-5">
          <div className="mt-2">
            {favData.map((stock) => (
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton display='flex' _expanded={{ bg: '#e2e8f0', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left' color={'black'} fontWeight={'semibold'}>
                        {stock.companyAbbr}
                      </Box>
                      <AccordionIcon color={'green'} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={'black'} fontWeight={'normal'} display={'flex'} flexDirection={'col'} justifyContent={'space-between'}>
                    <h2>Open: {stock.open}</h2>
                    <h2>Close: {stock.close}</h2>
                    <h2>High: {stock.high}</h2>
                    <h2>Low: {stock.low}</h2>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>))}
          </div>
          <LineChart favData={favData} />

        </div>

      </div >
    </>
  );
}
