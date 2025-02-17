"use client";
const { createContext, useState, useContext } = require("react");

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("Context używany poza providerem");

  return context;
};

export { ReservationProvider, useReservation };
