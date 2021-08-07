import React, { useState, useEffect } from "react";
import { Layout, Todolist } from "./components";
import { db, auth } from "../components/firebase";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  list_item: Yup.string().required("List Item Is Required"),
});

const Todo = ({ user }) => {
  const [Items, setItems] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      const docRef = db.collection("todos").doc(user.uid);
      docRef.onSnapshot((docSnap) => {
        // console.log(docSnap)
        if (docSnap.exists) {
          // console.log(docSnap.data().todos)
          setItems(docSnap.data().todos);
        } else {
          console.log("no Docs");
        }
      });
    } else {
      history.push("./login");
    }
  }, []);

  const deleteItems = (deleteTodo) => {
    // console.log("Delete Button is Working");
    // setItems((oldItems) => {
    //   return oldItems.filter((arrElem, index) => {
    //     return index !== id;
    //   });
    // });
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap.data().todos.filter((todo) => todo != deleteTodo);
      docRef.update({
        todos: result,
      });
    });
  };

  return (
    <>

<Link to="/userProf" className="btn btn-primary suerprof-btn">See user Prof</Link>

      <div className="main_div">
        <div className="center_div">
          <Formik
            initialValues={{
              list_item: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(value) => {
              try {
                // console.log(value.list_item);
                db.collection("todos")
                  .doc(user.uid)
                  .set({
                    todos: [...Items, value.list_item],
                  });
                value.list_item = "";
              } catch (e) {
                console.log("The reason of error is :", e);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div class="form-floating  mx-4">
                  <Field
                    type="text"
                    class="form-control w-50 d-inline "
                    name="list_item"
                    id="floatingPassword"
                    placeholder="List Item"
                  />
                  <label for="floatingPassword">List Item</label>
                  <button
                    type="submit "
                    className=" btn btn-success mx-2 position-absolute mt-2"
                  >
                    Add
                  </button>
                  {errors.list_item && touched.list_item ? (
                    <div className=" text-danger ">{errors.list_item}</div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
          <ol>
            {Items.map((itemval, index) => {
              return (
                <Todolist
                  key={index}
                  id={index}
                  text={itemval}
                  onSelect={deleteItems}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Todo;
