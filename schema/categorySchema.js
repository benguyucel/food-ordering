import * as Yup from "yup";

export const categorySchema = Yup.object({
    title: Yup.string().required("Title is Required").min(3, 'At least 3 character')
});