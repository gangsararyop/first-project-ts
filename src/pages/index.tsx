import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Create from "./create";
import firebase from "./../../firebase/clientApp";
import { collection, getDocs } from "@firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";

type DataFirebase = {
  dataEmployee: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    nip: string;
    birthDate: string;
  }[];
};

const Home: NextPage<DataFirebase> = (props: DataFirebase) => {
  const router = useRouter();

  const colTable: Array<string> = [
    "no",
    "name",
    "employee identity number",
    "email",
    "",
    "",
  ];

  const [handleModal, setHandleModal] = useState<boolean>(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteData: (id: string) => void = async (id) => {
    const db = firebase.firestore();

    const res = await db.collection("employee").doc(id).delete();

    refreshData();
  };

  return (
    <div>
      <div className="max-w-screen-lg mx-auto py-4">
        <div className="flex justify-between items-center mb-10">
          <div className="text-3xl font-semibold">Employee</div>
          <div>
            <button
              className="bg-[#103c82] text-white text-xs py-2 px-5 rounded-lg transition hover:bg-[#2b5497]"
              onClick={() => setHandleModal(true)}
            >
              Add employee
            </button>
          </div>
        </div>

        <div className="shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] bg-white rounded-lg py-4">
          <div className="text-base font-semibold mb-3 px-5">List Employee</div>

          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                {colTable.map((el) => (
                  <th
                    key={el}
                    className="uppercase text-xs text-gray-500 font-semibold text-left py-5 px-5"
                  >
                    {el}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-gray-700 font-semibold text-xs">
              {props.dataEmployee.map((el, index) => (
                <tr className="border-b last:border-none">
                  <td className="py-4 px-5">{index + 1}</td>
                  <td className="py-4 px-5">{el.name}</td>
                  <td className="py-4 px-5">{el.nip}</td>
                  <td className="py-4 px-5">{el.email}</td>
                  <td>
                    <Link href={`/detail/${el.id}`}>
                      <button className="font-semibold text-xs text-[#B24629]">
                        Detail
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteData(el.id)}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.667 10V8M9.333 10V8M2 4.667h12v0a2 2 0 0 0-2 2v4.666a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.666a2 2 0 0 0-2-2v0zM6.712 2.247c.076-.07.243-.133.476-.178C7.421 2.024 7.706 2 8 2c.293 0 .579.024.812.069.232.045.4.107.476.178"
                          stroke="#B24629"
                          stroke-width="1.4"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!props.dataEmployee.length ? (
            <div className="flex items-center justify-center w-full my-2 h-72 font-medium">
              No data available
            </div>
          ) : null}
        </div>
      </div>
      <Create open={handleModal} close={() => setHandleModal(false)} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const db = firebase.firestore();

  const employees = collection(db, "employee");

  let snapshot = (await getDocs(employees)).docs;

  const dataEmployee = snapshot.map((el) => {
    return { ...el.data(), id: el.id };
  });

  return { props: { dataEmployee } };
};

export default Home;
