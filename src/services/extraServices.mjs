import { departmentsRepository, ranksRepository } from "../repositories/extraRepository.mjs";

export const getDepartments = async () => {
  return await departmentsRepository.getAllDepartments();
};

export const getRanks = async () => {
  return await ranksRepository.getAllRanks();
};
