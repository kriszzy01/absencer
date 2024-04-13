import * as RadixDialog from "@radix-ui/react-dialog";

type Props = {
  isOpen: boolean;
  onToggle: (state: boolean) => void;
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const Dialog = (props: Props) => {
  return (
    <RadixDialog.Root open={props.isOpen} onOpenChange={props.onToggle}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <RadixDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {props.title}
          </RadixDialog.Title>

          {props.description && (
            <RadixDialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              {props.description}
            </RadixDialog.Description>
          )}

          {props.children}

          <RadixDialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              Close
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
