import * as Yup from "yup"

export const ContactFormSchema = Yup.object({
    fname:Yup.string().min(3, "minimum 3 characters").max(25, "maximum 25 characters").required("Please enter your first name"),
    lname:Yup.string().min(3, "minimum 3 characters").max(25, "maximum 25 characters").required("Please enter your last name"),
    email:Yup.string().email("please enetr a valid email address").required("Please enter your email address"),
    phone:Yup.number().required("Please enter your phone number"),
    message:Yup.string().min(12, "minimum 12 characters").max(300, "maximum 300 characters").required("Please enter your message"),
    attachedFile: Yup.mixed().test(
        "fileType",
        "Unsupported File Format",
        (value) => {
          if (value) {
            return (
              value.type === "image/jpeg" ||
              value.type === "image/jpg" ||
              value.type === "image/png" ||
              value.type === "application/pdf"
            );
          } else {
            return true;
          }
        }
      ),
})