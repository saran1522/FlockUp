import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { login } from "../../features/userSlice";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  description: yup.string().required("required"),
  location: yup.string().required("required"),
  profilePic: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  location: "",
  description: "",
  profilePic: "",
};

const initialValuesLogin = {
  username: "test",
  password: "TestPass@1234",
};

function LoginForm() {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  async function handleRegister(values, submitProps) {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePic", values.profilePic.name);
    const registerUserData = await fetch(
      "https://flockup.onrender.com/api/v1/user/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await registerUserData.json();
    submitProps.resetForm();
    if (data) {
      setPageType("login");
    }
  }

  async function handleLogin(values, submitProps) {
    const loggedInData = await fetch(
      "https://flockup.onrender.com/api/v1/user/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await loggedInData.json();
    submitProps.resetForm();
    const user = data.user;
    const token = data.accessToken;
    if (loggedInData.status === 200) {
      dispatch(login({ user, token }));
      navigate("/home");
    }
  }

  async function handleFormSubmit(values, submitProps) {
    if (isLogin) await handleLogin(values, submitProps);
    if (isRegister) await handleRegister(values, submitProps);
  }
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "sapn 4" }}
                />
                <TextField
                  label="location"
                  name="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "sapn 2" }}
                />
                <TextField
                  label="description"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "sapn 2" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.text.main}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("profilePic", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="2rem"
                        sx={{
                          border: `2px dashed ${palette.text.main}`,
                          cursor: "pointer",
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.profilePic ? (
                          <p>upload a profile picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.profilePic.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="username"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "sapn 4" }}
            />
            <TextField
              label="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "sapn 4" }}
            />
          </Box>
          <Box>
            <p style={{ color: "slategrey" }}>
              Please wait for sometime after clicking on login
            </p>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: ".8rem",
                backgroundColor: palette.background.alt,
                color: "white",
                fontSize: "1rem",
                background: `linear-gradient(to right bottom, ${theme.palette.gradient.first}, ${theme.palette.gradient.second})`,
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.text.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.text.main,
                },
              }}
            >
              {isLogin
                ? "Dont have an account? Register here"
                : "Already have an account? Login here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
