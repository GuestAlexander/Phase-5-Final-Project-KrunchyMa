import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTIPS, updateTIPS } from "../actions/tips";
import { useNavigate,useParams } from 'react-router-dom';
import TipsDataService from "../services/tips.service";

const AddTips = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id)

  const initialTipsState = {
    desc: "",
  };
  const [Tips, setTips] = useState(initialTipsState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTips({ ...Tips, [name]: value });
  };

  const getTipsBySingleId = id => {
    console.log(id)
    TipsDataService.getByIdTips(id)
      .then(response => {
        setTips(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => { 
    if(id > 0) {
      getTipsBySingleId(id);
    } else {
      setTips({
        desc: "",
      })

    }
  }, [id]);

  const saveTips = () => {
    const { desc } = Tips;
    if(id > 0) {
      dispatch(updateTIPS(id,desc))
      .then(data => {
        navigate("/mytips");
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      dispatch(createTIPS(desc))
      .then(data => {
        navigate("/mytips");
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const newTips = () => {
    setTips(initialTipsState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTips}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              required
              value={Tips.desc}
              onChange={handleInputChange}
              name="desc"
            />
          </div>

          <button onClick={saveTips} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTips;