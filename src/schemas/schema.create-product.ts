import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("The name of the product is required.")
    .min(1, "The name cannot be just spaces."),
  amount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .required("The amount is required.")
    .min(0, "The amount must be at least 1."),
  price: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .required("The price is required.")
    .min(0.01, "The price must be at least 0."),
});
