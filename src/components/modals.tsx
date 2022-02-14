import { Fragment, FunctionComponent } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  open: boolean;
  close: () => void;
};

const Modals: FunctionComponent<Props> = ({ open, close, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10" onClose={close}>
        <div className="flex items-end justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-80"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-4 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-80"
          >
            <div className="bg-white transform transition-all inline-block absolute bottom-2/4 right-2/4 translate-x-1/2 translate-y-1/2 px-4 py-4 rounded-xl w-4/12">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modals;
