import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
    toast.error("This is required you dummy", {
        duration: 2000,
    });

export default function MovieSearchBar({ onSearch }) {
    return (
        <>
            <Formik
                initialValues={{ search: "" }}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                    values.search === "" && notify();
                    onSearch(values.search);
                    actions.resetForm();
                }}
            >
                <Form>
                    <Field name="search" placeholder="search"></Field>
                    <button type="submit">Search</button>
                </Form>
            </Formik>
            <Toaster />
        </>
    );
}
