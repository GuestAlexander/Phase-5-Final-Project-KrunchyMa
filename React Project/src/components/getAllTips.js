import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveTIPS } from "../actions/tips";
import { useNavigate } from "react-router-dom";

const TipsList = () => {
  const Tips = useSelector((state) => state.tips);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveTIPS());
  }, []);

  const listItemStyles = {
    marginBottom: "0.5rem",
    borderRadius: "0.25rem",
    backgroundColor: "#FFC107",
    color: "#fff",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
    padding: "0.75rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const listItemHoverStyles = {
    ...listItemStyles,
    transform: "scale(1.1)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4 style={{ marginBottom: "1rem", color: "#FFA500" }}>Tips List</h4>
        <ul className="list-group">
          {Tips &&
            Tips.map((tip, index) => (
              <li
                className="list-group-item"
                key={index}
                style={listItemStyles}
                onMouseOver={(e) => {
                  e.currentTarget.style = listItemHoverStyles;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style = listItemStyles;
                }}
              >
                {tip.desc}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TipsList;


