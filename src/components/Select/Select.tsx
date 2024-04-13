import * as RadixSelect from "@radix-ui/react-select";

type Props = {
  id: string;
  name: string;
  options: string[];
  placeholder: string;
  onChange: (selectedOption: string) => void;
  selectedOption?: string;
};

export const Select = (props: Props) => {
  return (
    <div className="flex gap-1">
      <label htmlFor={props.id}>{props.id}:</label>
      <RadixSelect.Root
        value={props.selectedOption}
        onValueChange={props.onChange}
      >
        <RadixSelect.Trigger
          aria-label={props.name}
          id={props.id}
          className="border w-[170px] flex items-center justify-between px-2"
        >
          <RadixSelect.Value
            aria-label={props.selectedOption}
            placeholder={props.placeholder}
          >
            {props.selectedOption || props.placeholder}
          </RadixSelect.Value>
          <RadixSelect.Icon />
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            className="border w-[170px]"
            sideOffset={4}
          >
            <RadixSelect.Viewport>
              {props.options.map((option) => (
                <RadixSelect.Item
                  key={option}
                  value={option}
                  className="px-2 w-full"
                >
                  <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};
