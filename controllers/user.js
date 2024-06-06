const User = require("../models/userModel");

async function handleAllUsers(req, res) {
  const allUsers = await User.find({});
  res.json(allUsers);
}

async function handleGetUserById(req, res) {
  // const userId = Number(req.params.id);
  // const user = users.find((user) => user.id === userId);

  const user = await User.findById(req.params.id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
}

async function handleUpdateUserById(req, res) {
  // const userId = Number(req.params.id);
  // const userData = req.body;
  // console.log(userData.email);
  // const userIndex = users.findIndex((user) => user.id === userId);
  // if (userIndex !== -1) {
  //   const updatedUser = { ...users[userIndex], ...userData };
  //   users[userIndex] = updatedUser;
  //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //     return res.json({ status: "Success", user: updatedUser });
  //   });
  // } else {
  //   return res.status(404).json({ error: "User not found" });
  // }

  //update using mongoose model to the database.
  const userId = req.params.id;
  const updateData = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true, // return the updated document
    runValidators: true, // validate updates against the schema
  });

  if (updatedUser) {
    return res.json({ status: "Success", user: updatedUser });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
}

async function handleDeleteUserById(req, res) {
  // const userId = Number(req.params.id);
  // const userIndex = users.findIndex((user) => user.id === userId);
  // if (userIndex !== -1) {
  //   const userDeleted = users.splice(userIndex, 1)[0];
  //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //     return res.json({ status: "Success", userDeleted });
  //   });
  // } else {
  //   return res.status(404).json({ error: "User not found" });
  // }

  //Deleting item using mongoose model from the database
  const userId = req.params.id;
  const userDeleted = await User.findByIdAndDelete(userId);
  if (userDeleted) {
    return res.json({ status: "Success", userDeleted });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
}

async function handlePostUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //-->Writing the files directltly into the mocj_data.json file

  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res
  //     .status(201)
  //     .json({ status: "Successfully created", id: users.length });
  // });

  // --> Saving each user into the database Collection

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "Success", id: result._id });
}

module.exports = {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePostUser,
};
