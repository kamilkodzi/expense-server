import Family, { IFamily } from "../models/Family";

const showFamilies = async (req, res) => {
  const results = await Family.find();
  res.status(200).json(results);
};

const createFamily = async (req, res) => {
  const { familyName } = req.body;
  const currentUser = req.user._id;

  const newFamily: IFamily = {
    familyName: familyName,
    headOfFamily: currentUser,
  };
  const responseNewFamily = await Family.create(newFamily);

  res.status(200).json(responseNewFamily);
};

export { createFamily, showFamilies };
