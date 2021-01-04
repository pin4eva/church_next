import Axios from "axios";
import React from "react";

const MYURL = process.env.VERCEL_URL;

const Test = () => {
  console.log(MYURL);
  const getTest = async () => {
    const { data } = await Axios.get(`${MYURL}/api/test`);
    console.log(data);
  };
  return (
    <div>
      <h3>Hello World</h3>
      <button className="btn btn-primary" onClick={getTest}>
        Get test
      </button>
    </div>
  );
};

export default Test;
