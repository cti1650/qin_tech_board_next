import { useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export const Detail = (props) => {
  let { flag } = props;
  let [isOpen, setIsOpen] = useState(flag);
  let completeButtonRef = useRef(null);

  const completeOrder = () => {
    alert('test');
  }

  return (
    <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
    >
        <Dialog initialFocus={completeButtonRef} open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay />

        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
            This will permanently deactivate your account
        </Dialog.Description>

        <p>
            Are you sure you want to deactivate your account? All of your data will
            be permanently removed. This action cannot be undone.
        </p>

        <button ref={completeButtonRef} onClick={completeOrder}>
          Complete order
        </button>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog>
    </Transition>
  )
}