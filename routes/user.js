const express = require("express");
const {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePostUser,
} = require("../controllers/user");

const router = express.Router();

// router.get("/users", async (req, res) => {
//     const allUsers = await User.find({});
//     const html = `<h1> Users </h1>
//       <ul>
//       ${allUsers
//         .map(
//           (user) =>
//             `<li> ${user.firstName + " " + user.lastName} - ${user.email}</li>`
//         )
//         .join("")}
//       </ul
//       `;
//     res.send(html);
//   });

router.route("/").get(handleAllUsers).post(handlePostUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
