import { User } from "../MODELS/userModel.js";
import { Job } from "../MODELS/jobModel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHndler from "../utils/asyncHandler.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { createAccessToken } from "../utils/genrateAccessToken.js";
import { hashPassword, verifyPassword } from "../utils/hashPassword.js";

const registerUser = asyncHndler(async (req, res) => {
  const { firstName, lastName, userName, email, password, category } = req.body;
  if (
    !(
      firstName &&
      lastName &&
      userName &&
      email &&
      password &&
      category &&
      req.file
    )
  )
    throw new ApiError(400, "All fields are required");
  console.log(req.body);
  const existedUser = await User.findOne({ email: email });

  if (existedUser) throw new ApiError(400, "Email is already registered !");

  const uploadImage = await uploadImageOnCloudinary(req.file.path);

  if (!uploadImage) throw new ApiError(500, "Cover Image Upload failed");

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) throw new ApiError(500, "Password hashing failed");
  const user = await User.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    category: category,
    userName: userName,
    password: hashedPassword,
    category: category,
    coverImage: uploadImage.url,
  });
  if (!user)
    throw new ApiError(500, "Unable to register the user... Try again");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Successfully created the user"));
});

const loginUser = asyncHndler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!(email && password)) throw new ApiError(400, "Both field are required");

  const user = await User.findOne({ email: email });
  if (!user) throw new ApiError(400, "email is not registered! Create Account");

  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid password");

  const accessToken = createAccessToken(user._id);
  if (!accessToken) throw new ApiError(400, "Access Token Generation failed");
  console.log(accessToken);
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 360000,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, "User login Successfully"));
});

const logout = asyncHndler(async (req, res) => {
  res
    .clearCookie("accessToken")
    .status(200)
    .json(new ApiResponse(200, "Successfully logged out"));
});

const createJob = asyncHndler(async (req, res) => {
  const {
    title,
    description,
    type,
    location,
    salary,
    skills,
    education,
    deadLine,
    email,
    companyName = "",
    companyDescription = "",
    experience = "",
  } = req.body;

  if (
    !(
      title &&
      description &&
      type &&
      companyName &&
      location &&
      salary &&
      skills &&
      education &&
      deadLine &&
      email
    )
  )
    throw new ApiError(400, "Give Suffient information about the job");
  const { category, _id } = req.user;

  if (!_id || !category)
    throw new ApiError(400, "Request without user || Unauthorized access");

  if (category == "employee")
    throw new ApiError(400, "Employee Cannot create Job");

  //creatin Job
  const job = await Job.create({
    employer_id: _id,
    title: title,
    description: description,
    type: type,
    companyName: companyName,
    location: location,
    salary: salary,
    skills: skills,
    education: education,
    deadLine: deadLine,
    email: email,
    companyDescription: companyDescription,
    experience: experience,
  });

  if (!job) throw new ApiError(500, "Something wrong happened");

  res.status(200).json(new ApiResponse(200, job, "Created Job Successfully"));
});

const deleteJob = asyncHndler(async (req, res) => {
  if (req.user.category == "employee")
    throw new ApiError(400, "Unvalid request");
  
});
export { registerUser, loginUser, logout, createJob, deleteJob };
