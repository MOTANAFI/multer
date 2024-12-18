import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const uploadImage = async (imageData) => {
  const response = await axios.post(
    "http://localhost:5000/multiple",
    imageData
  );
  console.log("image uploaded successfully", response.data);
};
function App() {
  const { mutate, isError, isSuccess, data } = useMutation({
    mutationFn: uploadImage,
  });
  const formik = useFormik({
    initialValues: {
      files: [],
    },
    validationSchema: Yup.object({
      files: Yup.array()
        .required("At least one file is required")
        .min(1, "You must upload at least one file")
        .test("fileTypes", "Only image files are allowed", (files) =>
          files.every((file) =>
            ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
          )
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      values.files.forEach((file) => formData.append("images", file));
      mutate(formData, {
        onSuccess: () => {
          
        },
      });
    },
  });
  return (
    <div className="app">
      <h1>React file uploading</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="file"
          name="images"
          multiple
          // {...formik.getFieldProps("file")}
          onChange={(e) =>
            formik.setFieldValue("files", Array.from(e.target.files))
          }
        />
        <button
          type="submit"
          disabled={formik.isSubmitting || formik.errors.files}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
