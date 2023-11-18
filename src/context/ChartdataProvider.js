import { createContext, useState, useCallback } from "react";

const INITIAL_CHARTDATA = {
  coinlist: [],
  setCoinList: () => {},
};

export const ChartdataContext = createContext(INITIAL_CHARTDATA);

function ChartdataProvider({ children }) {
  const [coinlist, setCoinList] = useState(INITIAL_CHARTDATA.coinlist);

  const updateCoinList = useCallback((newCoinList) => {
    setCoinList(newCoinList);
  }, []);


  return (
    <ChartdataContext.Provider value={{ coinlist, updateCoinList }}>
      {children}
    </ChartdataContext.Provider>
  );
}

export default ChartdataProvider;

