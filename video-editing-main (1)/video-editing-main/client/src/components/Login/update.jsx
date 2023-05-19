import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {
    Alert,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "./bg.jpg";
import Cookies from "js-cookie";
import { userApi } from "../../api";

const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
};

function UpdateInfo() {
    const [err, setErr] = useState(false);
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [fullname, setFullname] = useState(localStorage.getItem("fullName"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // const handleClickShowPassword = () => setShowPassword(!showPassword);
    // const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    // const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setErr(false);
    };

    const toastMessage = (status, title, text) => {
        Swal.fire({
            icon: status,
            title: title,
            text: text
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        

        const updateInfo = async () => {
            try {                  
                const body = {
                    email,
                    fullname,       
                };
                var response = await userApi.updateinfo(body);
                setLoading(false);
                toastMessage('success', 'Update Success', 'Everything ok');                                            
            } catch (error) {
                setLoading(false);
                setErr(true);
                setMessage(error.response.data.description);
            }
        };
        updateInfo();
    };

    return (
        <div style={style}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={err}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <Paper
                sx={{
                    padding: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "30px",
                }}
            >
                <Typography
                    sx={{
                        color: "#408DBA",
                        textAlign: "center",
                    }}
                    variant="h5"
                    component="h1"
                >
                    <b>Update Info</b>
                </Typography>

                <Grid
                    sx={{
                        mt: "20px",
                        width: "18vw",
                        minWidth: "300px",
                    }}
                    container
                    spacing={2}
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete="false"
                >

                    

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Fullname"
                            variant="outlined"
                            required
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid> 

                    <Grid
                        item
                        xs={12}
                        mt={3}
                        alignItems="center"
                        display="flex"
                        position="relative"
                    >
                        <Button
                            variant="contained"
                            sx={{
                                paddingLeft: "70px",
                                paddingRight: "70px",
                                margin: "auto",
                                backgroundColor: "#408DBA",
                            }}
                            disabled={loading}
                            type="submit"
                        >
                            Update Info
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={25}
                                sx={{
                                    color: "blue",
                                    position: "absolute",
                                    top: "40%",
                                    left: "50%",
                                }}
                            />
                        )}
                    </Grid>
                    
                </Grid>
            </Paper>
        </div>
    );
}

export default UpdateInfo;