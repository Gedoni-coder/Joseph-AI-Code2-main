import type { Request, Response } from "express";
import { adminPrisma } from "../admin.db.ts";

// category.service.ts
import type { CreateCategoryInput } from "../category.types.ts";

export async function createCategory(input: CreateCategoryInput) {
  const { name, parentId = null } = input;
  try {
    if (!name || typeof name !== "string") {
      throw new Error("CATEGORY_NAME_REQUIRED");
    }

    const normalizedName = name.trim().toLowerCase();

    if (parentId) {
      const parentExists = await adminPrisma.category.findUnique({
        where: { id: parentId },
      });

      if (!parentExists) {
        throw new Error("PARENT_CATEGORY_NOT_FOUND");
      }
      const existingCategory = await adminPrisma.category.findFirst({
        where: {
          name: normalizedName,
          parent_id: parentId,
        },
      });
      if (existingCategory) {
        throw new Error("CATEGORY_ALREADY_EXISTS");
      }
      return adminPrisma.category.create({
        data: {
          name: normalizedName,
          parent_id: parentId,
        },
      });
    } else {
      const existingCategory = await adminPrisma.category.findFirst({
        where: {
          name: normalizedName,
          parent_id: null,
        },
      });
      if (existingCategory) {
        throw new Error("CATEGORY_ALREADY_EXISTS");
      }
      return adminPrisma.category.create({
        data: {
          name: normalizedName,
          parent_id: null,
        },
      });
    }
  } catch (err) {
    throw err;
  }
}
