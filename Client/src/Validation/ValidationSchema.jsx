// import * as Yup from "yup";

// export const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   barcode: Yup.string().required("Barcode is required"),
//   images: Yup.mixed()
//     .test("fileCount", "You can upload a maximum of 2 images.", (value) => {
//       return value.length <= 2;
//     })
//     .required("Images are required"),
//   openingTime: Yup.string().when("is24Hours", {
//     is: false,
//     then: Yup.string().required("Opening time is required"),
//   }),
//   closingTime: Yup.string().when("is24Hours", {
//     is: false,
//     then: Yup.string().required("Closing time is required"),
//   }),
//   country: Yup.string().required("Country is required"),
//   state: Yup.string().required("State is required"),
//   city: Yup.string().required("City is required"),
//   street: Yup.string().required("Street is required"),
//   postalCode: Yup.string().required("Postal code is required"),
//   latitude: Yup.string().required("Latitude is required"),
//   longitude: Yup.string().required("Longitude is required"),
// });




