import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import AddressList from "./AddressList";

export default function AddressSelection({
  addresses,
  selectedValue,
  handleChange,
  handleEdit,
  handleDelete,
}) {
  return (
    <FormControl>
      <FormLabel>Select Address</FormLabel>
      <RadioGroup value={selectedValue} onChange={handleChange}>
        <AddressList
          addresses={addresses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </RadioGroup>
    </FormControl>
  );
}
