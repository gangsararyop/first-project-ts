import { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import Modals from "../components/modals";
import firebase from "./../../firebase/clientApp";
import { useRouter } from "next/router";

type FormValues = {
  name: string;
  nip: number | null;
  email: string;
  phoneNumber: number | null;
  dateBirth: string;
  gender: string;
};

type Modal = {
  open: boolean;
  close: () => void;
};

const Create: NextPage<Modal> = ({ open, close }) => {
  const router = useRouter();

  const initialValues: FormValues = {
    name: "",
    nip: null,
    email: "",
    phoneNumber: null,
    dateBirth: "",
    gender: "",
  };

  const arrForm: { title: string; name: string; placeholder: string }[] = [
    {
      title: "Name",
      name: "name",
      placeholder: "Input name",
    },
    {
      title: "Id",
      name: "nip",
      placeholder: "Input identity number",
    },
    {
      title: "Email",
      name: "email",
      placeholder: "e.g. narutosakura@gmail.com",
    },
    {
      title: "Phone Number",
      name: "phoneNumber",
      placeholder: "e.g. 081234567890",
    },
  ];

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <Modals open={open} close={close}>
      <div className="p-3">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            console.log(values, actions);

            const db = firebase.firestore();

            await db
              .collection("employee")
              .doc()
              .set({ ...values, createOn: new Date().toLocaleString("id-ID") });

            actions.setSubmitting(false);

            close();

            refreshData();
          }}
        >
          <Form className="space-y-6">
            {arrForm.map((el, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-sm "
              >
                <label
                  htmlFor={el.name}
                  className="font-semibold text-gray-700 text-right w-1/4 mr-3"
                >
                  {el.title}
                </label>
                <Field
                  id={el.name}
                  name={el.name}
                  placeholder={el.placeholder}
                  className="bg-gray-200 rounded-md py-2 px-3 w-3/4"
                />
              </div>
            ))}
            <div className="flex items-center justify-center text-sm ">
              <label
                htmlFor="dateBirth"
                className="font-semibold text-gray-700 text-right w-1/4 mr-3"
              >
                Date of Birth
              </label>
              <Field
                type="date"
                id="dateBirth"
                name="dateBirth"
                placeholder="Input date of birth"
                className="bg-gray-200 rounded-md py-2 px-3 w-3/4"
              />
            </div>
            <div className="flex items-center justify-center text-sm ">
              <label
                htmlFor="gender"
                className="font-semibold text-gray-700 text-right w-1/4 mr-3"
              >
                Gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                placeholder="Input gender"
                className="bg-gray-200 rounded-md py-2 px-3 w-3/4"
              >
                <option value="" hidden>
                  Input gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
            </div>

            <div className="w-full flex justify-end">
              <button
                className="mr-5 text-sm font-medium hover:bg-gray-200 transition-all duration-200 px-3 py-2 rounded-md"
                type="button"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#103c82] rounded-md text-white text-sm font-medium py-2 px-3 w-3/12 hover:bg-[#2b5497] transition-all duration-200"
              >
                Add
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modals>
  );
};

export default Create;
