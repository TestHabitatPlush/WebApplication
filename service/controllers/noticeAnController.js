// const { Notice, User, Role } = require("../models");
// const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
// const { Op } = require("sequelize");

// const SUPER_ADMIN_ROLES = ["super_admin", "super_admin_it"];
// const SOCIETY_ADMIN_ROLES = ["society_moderator", "management_committee"];

// const createNoticeBySocietyId = async (req, res) => {
//   try {
//     const { societyId, userId } = req.params;
//     const { noticeHeading, noticeDescription, noticeExpireDate } = req.body;

//     if (!noticeHeading || !noticeDescription || !noticeExpireDate) {
//       return sendErrorResponse(res, "Missing required fields", 400);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     if (user.societyId?.toString() !== societyId.toString()) {
//       return sendErrorResponse(res, "Unauthorized society access", 403);
//     }

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     if (!SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
//       return sendErrorResponse(res, "Permission denied", 403);
//     }

//     const notice = await Notice.create({
//       societyId,
//       userId,
//       roleId: user.roleId,
//       createdByRole: role.roleCategory,
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       roleCategories: ["all"],
//     });

//     return sendSuccessResponse(
//       res,
//       "Society notice created successfully",
//       notice,
//       201
//     );
//   } catch (err) {
//     return sendErrorResponse(res, "Internal Server Error", 500, err.message);
//   }
// };

// const createNoticeByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { noticeHeading, noticeDescription, noticeExpireDate } = req.body;

//     if (!noticeHeading || !noticeDescription || !noticeExpireDate) {
//       return sendErrorResponse(res, "Missing required fields", 400);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     if (!SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
//       return sendErrorResponse(
//         res,
//         "Only Super Admin can create global notice",
//         403
//       );
//     }

//     const notice = await Notice.create({
//       societyId: null,
//       userId,
//       roleId: user.roleId,
//       createdByRole: role.roleCategory,
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       roleCategories: ["all"],
//     });

//     return sendSuccessResponse(
//       res,
//       "Global notice created successfully",
//       notice,
//       201
//     );
//   } catch (err) {
//     return sendErrorResponse(res, "Error creating notice", 500, err.message);
//   }
// };

// const getNoticesBySocietyId = async (req, res) => {
//   try {
//     const { societyId, userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     if (
//       !SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
//       user.societyId?.toString() !== societyId.toString()
//     ) {
//       return sendErrorResponse(res, "Unauthorized society access", 403);
//     }

//     const notices = await Notice.findAll({
//       where: {
//         [Op.or]: [
//           { societyId },
//           { societyId: null },
//         ],
//       },
//       order: [["createdAt", "DESC"]],
//     });

//     return sendSuccessResponse(
//       res,
//       "Notices fetched successfully",
//       notices
//     );
//   } catch (err) {
//     return sendErrorResponse(res, "Internal Server Error", 500, err.message);
//   }
// };

// const getNoticesByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const notices = await Notice.findAll({
//       where: { userId },
//       order: [["createdAt", "DESC"]],
//     });

//     return sendSuccessResponse(
//       res,
//       "User notices fetched successfully",
//       notices
//     );
//   } catch (err) {
//     return sendErrorResponse(res, "Error fetching notices", 500, err.message);
//   }
// };

// const updateNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;
//     const { userId } = req.body;

//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) return sendErrorResponse(res, "Notice not found", 404);

//     const user = await User.findByPk(userId);
//     const role = await Role.findByPk(user.roleId);

//     const isAllowed =
//       (SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
//         notice.societyId === null) ||
//       (SOCIETY_ADMIN_ROLES.includes(role.roleCategory) &&
//         notice.societyId !== null);

//     if (!isAllowed) {
//       return sendErrorResponse(res, "Permission denied", 403);
//     }

//     await notice.update(req.body);
//     return sendSuccessResponse(res, "Notice updated successfully", notice);
//   } catch (err) {
//     return sendErrorResponse(res, "Error updating notice", 500, err.message);
//   }
// };

// const deleteNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;
//     const { userId } = req.body;

//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) return sendErrorResponse(res, "Notice not found", 404);

//     const user = await User.findByPk(userId);
//     const role = await Role.findByPk(user.roleId);

//     const isAllowed =
//       (SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
//         notice.societyId === null) ||
//       (SOCIETY_ADMIN_ROLES.includes(role.roleCategory) &&
//         notice.societyId !== null);

//     if (!isAllowed) {
//       return sendErrorResponse(res, "Permission denied", 403);
//     }

//     await notice.destroy();
//     return sendSuccessResponse(res, "Notice deleted successfully");
//   } catch (err) {
//     return sendErrorResponse(res, "Error deleting notice", 500, err.message);
//   }
// };

// module.exports = {
//   createNoticeBySocietyId,
//   createNoticeByUserId,
//   getNoticesBySocietyId,
//   getNoticesByUserId,
//   updateNoticeById,
//   deleteNoticeById,
// };


const { Notice, User, Role } = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { Op } = require("sequelize");

const SUPER_ADMIN_ROLES = ["super_admin", "super_admin_it"];
const SOCIETY_ADMIN_ROLES = ["society_moderator", "management_committee"];

const visibilityMap = {
  owner: ["society_owner", "society_owner_family"],
  tenant: ["society_tenant", "society_tenant_family"],
  primary: ["primary_member"],
  all: [
    "society_owner",
    "society_owner_family",
    "society_tenant",
    "society_tenant_family",
  ],
};

const createNoticeBySocietyId = async (req, res) => {
  try {
    const { societyId, userId } = req.params;
    const {
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      visibilityOption = "all",
    } = req.body;

    if (!noticeHeading || !noticeDescription || !noticeExpireDate) {
      return sendErrorResponse(res, "Missing required fields", 400);
    }

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    if (user.societyId?.toString() !== societyId.toString()) {
      return sendErrorResponse(res, "Unauthorized society access", 403);
    }

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    if (!SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
      return sendErrorResponse(res, "Permission denied", 403);
    }

    const roleCategories =
      visibilityMap[visibilityOption] || visibilityMap.all;

    const notice = await Notice.create({
      societyId,
      userId,
      roleId: user.roleId,
      createdByRole: role.roleCategory,
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      roleCategories, 
    });

    return sendSuccessResponse(
      res,
      "Society notice created successfully",
      notice,
      201
    );
  } catch (err) {
    return sendErrorResponse(res, "Internal Server Error", 500, err.message);
  }
};


const createNoticeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      visibilityOption = "all",
    } = req.body;

    if (!noticeHeading || !noticeDescription || !noticeExpireDate) {
      return sendErrorResponse(res, "Missing required fields", 400);
    }

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    if (!SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
      return sendErrorResponse(
        res,
        "Only Super Admin can create global notice",
        403
      );
    }

    const roleCategories =
      visibilityMap[visibilityOption] || visibilityMap.all;

    const notice = await Notice.create({
      societyId: null,
      userId,
      roleId: user.roleId,
      createdByRole: role.roleCategory,
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      roleCategories, 
    });

    return sendSuccessResponse(
      res,
      "Global notice created successfully",
      notice,
      201
    );
  } catch (err) {
    return sendErrorResponse(res, "Error creating notice", 500, err.message);
  }
};


const getNoticesBySocietyId = async (req, res) => {
  try {
    const { societyId, userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    if (
      !SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
      user.societyId?.toString() !== societyId.toString()
    ) {
      return sendErrorResponse(res, "Unauthorized society access", 403);
    }

    const notices = await Notice.findAll({
      where: {
        [Op.or]: [{ societyId }, { societyId: null }],
      },
      order: [["createdAt", "DESC"]],
    });

    return sendSuccessResponse(
      res,
      "Notices fetched successfully",
      notices
    );
  } catch (err) {
    return sendErrorResponse(res, "Internal Server Error", 500, err.message);
  }
};

const getNoticesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const notices = await Notice.findAll({
      where: {
        [Op.or]: [
          { societyId: null },
          { societyId: user.societyId },
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    const visibleNotices = notices.filter((notice) => {
      if (notice.societyId === null) return true;

      if (SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
        return false;
      }

      if (SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
        return true;
      }

      if (!Array.isArray(notice.roleCategories)) return false;

      return notice.roleCategories.includes(role.roleCategory);
    });

    return sendSuccessResponse(
      res,
      "User notices fetched successfully",
      visibleNotices
    );
  } catch (err) {
    return sendErrorResponse(res, "Error fetching notices", 500, err.message);
  }
};



const updateNoticeById = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const { userId } = req.body;

    const notice = await Notice.findByPk(noticeId);
    if (!notice) return sendErrorResponse(res, "Notice not found", 404);

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(user.roleId);

    const isAllowed =
      (SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
        notice.societyId === null) ||
      (SOCIETY_ADMIN_ROLES.includes(role.roleCategory) &&
        notice.societyId !== null);

    if (!isAllowed) {
      return sendErrorResponse(res, "Permission denied", 403);
    }

    await notice.update(req.body);
    return sendSuccessResponse(res, "Notice updated successfully", notice);
  } catch (err) {
    return sendErrorResponse(res, "Error updating notice", 500, err.message);
  }
};


const deleteNoticeById = async (req, res) => {
  try {
    const { noticeId } = req.params;

    if (!noticeId) {
      return sendErrorResponse(res, "Notice ID is required", 400);
    }

    const notice = await Notice.findByPk(noticeId);
    if (!notice) {
      return sendErrorResponse(res, "Notice not found", 404);
    }

    await notice.destroy();
    return sendSuccessResponse(res, "Notice deleted successfully");
  } catch (error) {
    console.error("Delete notice error:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};

module.exports = {
  createNoticeBySocietyId,
  createNoticeByUserId,
  getNoticesBySocietyId,
  getNoticesByUserId,
  updateNoticeById,
  deleteNoticeById,
};
