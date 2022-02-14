import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import firebase from "./../../../firebase/clientApp";

/*
 * InferGetServerSideProps untuk define secara otomatis props dari getServerSideProps, jadi, tidak perlu define secara manual lagi
 */

const Detail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { name, email, phoneNumber, gender, dateBirth, nip } = props.snapshot;
  const arrData: { title: string; data: string }[] = [
    { title: "Name", data: name },
    { title: "Identity number", data: nip },
    { title: "Gender", data: gender },
    { title: "Email", data: email },
    { title: "Phone number", data: phoneNumber },
    { title: "Date of Birth", data: dateBirth },
  ];

  return (
    <div className="max-w-screen-lg mx-auto py-4">
      <div className="flex items-center text-lg font-semibold mb-9">
        <Link href="/">
          <button className="mr-3">
            <svg
              width="35"
              height="24"
              viewBox="0 0 56 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m15 6-6 6m0 0 6 6m-6-6h39"
                stroke="#5A5A5A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
        <div>Detail data employee</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center rounded-md w-11 aspect-square bg-gray-300 mr-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24-1.397.804-2.402 1.931-2.857 3.207"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs font-medium">{email}</div>
        </div>
      </div>

      <div className="mt-4 p-4 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-lg">
        <div className="text-md font-semibold mb-4">Personal detail</div>

        {arrData.map((el, index) => (
          <div
            key={index}
            className="flex text-sm py-2 border-b last:border-none"
          >
            <div className="w-1/4 uppercase text-gray-400  font-semibold">
              {el.title}
            </div>
            <div className="font-medium text-gray-600">{el.data}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (query) => {
  const id = query.params?.id as string;

  const db = firebase.firestore();

  const snapshot = (await db.collection("employee").doc(id).get()).data();

  return { props: { snapshot } };
};

export default Detail;
