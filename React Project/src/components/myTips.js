import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userTIPS, findTIPSByID } from "../actions/tips";
import { useNavigate } from "react-router-dom";

const MyTipsList = () => {
  const Tips = useSelector((state) => state.tips);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(userTIPS());
  }, []);

  const getByIdTips = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>My Tips</h4>
        <ul className="list-group">
          {Tips &&
            Tips.map((tip, index) => (
              <li
                className={"list-group-item"}
                key={index}
                style={{
                  backgroundColor: "lightblue",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.backgroundColor = "dodgerblue";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "lightblue";
                }}
              >
                {tip.desc}

                <button
                  onClick={() => getByIdTips(tip.id)}
                  className="btn btn-primary"
                  style={{
                    float: "right",
                    backgroundColor: "mediumseagreen",
                    borderColor: "mediumseagreen",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "limegreen";
                    e.currentTarget.style.borderColor = "limegreen";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "mediumseagreen";
                    e.currentTarget.style.borderColor = "mediumseagreen";
                  }}
                >
                  Update
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MyTipsList;