import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import './sideMenu.scss';
import withClass from "./withClass";
import { toggleFilter, toggleAll } from "../../redux/filterSlice";

const SideMenu = () => {
  const options = [
    { id: 'all', label: "Все" },
    { id: 'noTransfers', label: "Без пересадок" },
    { id: 'oneTransfer', label: "1 пересадка" },
    { id: 'twoTransfers', label: "2 пересадки" },
    { id: 'threeTransfers', label: "3 пересадки" },
  ];

  // Извлекаем filters с защитой от ошибок
  const filters = useSelector((state) => state.filters || {});
  const dispatch = useDispatch();

  const checkboxList = options.map(({ id, label }, index) => {
    return (
      <label
        htmlFor={`checkbox${index}`}
        key={id}
        className="label"
        style={{ padding: '10px', paddingLeft: '20px' }}
      >
        <input
          type="checkbox"
          checked={filters[id]} // Привязка состояния из Redux
          id={`checkbox${index}`}
          name="checkbox"
          style={{
            accentColor: 'green',
          }}
          onChange={() => {
            if (id === 'all') {
              dispatch(toggleAll());
            } else {
              dispatch(toggleFilter(id));
            }
          }}
        />
        <div className="custom-checkbox"></div>
        {label}
      </label>
    );
  });

  return (
    <React.Fragment>
      <p
        style={{
          letterSpacing: '0.5px',
          padding: '20px',
          paddingBottom: '0px',
          margin: 0,
          marginBottom: '10px',
        }}
      >
        КОЛИЧЕСТВО ПЕРЕСАДОК
      </p>
      <div className="sideMenuInput">
        {checkboxList}
      </div>
    </React.Fragment>
  );
};

export default withClass(SideMenu, 'sideMenu');
