import * as Dialog from "@radix-ui/react-dialog";

export function AlertModal({ open, onOpenChange, message }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-[90vw] max-w-md
                     -translate-x-1/2 -translate-y-1/2
                     rounded-xl bg-white p-6 shadow-xl"
        >
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            Atenção
          </Dialog.Title>

          <Dialog.Description className="mt-2 text-sm text-gray-600">
            {message}
          </Dialog.Description>

          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <button
                className="px-4 py-2 text-sm rounded-md
                           bg-blue-700 text-white hover:bg-blue-800"
              >
                Entendi
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
