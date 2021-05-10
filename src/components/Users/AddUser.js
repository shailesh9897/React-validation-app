import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUserName, setUserName] = useState("");
  const [enteredAge, setAge] = useState("");
  const [error, setError] = useState();
  const userNameEventHandler = (event) => {
    setUserName(event.target.value);
  };
  const ageEventHandler = (event) => {
    setAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title:"Invalid Input",
        msg:"Please Enter a Valid UserName and Age  (non-empty Values)."
      })
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title:"Invalid Age",
        msg:"Please Enter a Valid Age."
      })
      return;
    }
    props.onEverySubmit(enteredUserName, enteredAge, Math.random().toString());
    setUserName("");
    setAge("");
  };
  const errorConfirmEventHandler=(event)=>{
    setError(null);
  }
  return (
    <div>
     {error && < ErrorModal
     onconfirm={errorConfirmEventHandler}
        title={error.title}
        msg={error.msg}
      ></ErrorModal>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUserName}
            onChange={userNameEventHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageEventHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
