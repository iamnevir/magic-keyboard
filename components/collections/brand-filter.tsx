import { api } from "@/convex/_generated/api";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useQuery } from "convex/react";
import slugify from "react-slugify";

const BrandFilter = ({ onChange }: { onChange: (value: string[]) => void }) => {
  const products = useQuery(api.product.getProducts);
  const brands = products
    ?.map((product) => product.producer)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  return (
    <CheckboxGroup onValueChange={onChange} color="success">
      {brands?.map((item) => (
        <Checkbox value={slugify(item)}>{item}</Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default BrandFilter;
