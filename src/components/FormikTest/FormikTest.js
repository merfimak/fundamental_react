import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classes from './FormikTest.module.css';
 

    const FormikTest = (props) => {
        return (
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field  className={classes.formik_input} name="firstName" type="text" />
              <div  className={classes.formik_error}> <ErrorMessage name="firstName" /> </div>
             
      
              <label htmlFor="lastName">Last Name</label>
              <Field className={classes.formik_input} name="lastName" type="text" />
              <div  className={classes.formik_error}> <ErrorMessage name="lastName" /> </div>
      
              <label htmlFor="email">Email Address</label>
              <Field className={classes.formik_input}  name="email" type="email" />
              <div  className={classes.formik_error}> <ErrorMessage name="email" /> </div>
      
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        );
      };

export default FormikTest;